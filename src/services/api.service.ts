import { getCookie } from '@/app/actions/cookies';
import { API_URL, MEDIA_UPLOAD } from '@/configs';
import { ApiResponseType, SearchParamsFilterType } from '@/types';
import { removeEmptyStringFields } from '@/utils';
import { cookies } from 'next/headers';

const createRequestConfig = (method: string, session: string, body?: unknown): RequestInit => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: session
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return config;
};

const createUrl = (endpoint: string, filter?: SearchParamsFilterType): URL => {
  const url = new URL(`${API_URL}${endpoint}`);

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (key === 'page' || key === 'limit') {
        url.searchParams.append(key, String(value));
      } else {
        url.searchParams.append(`filter[${key}]`, String(value));
      }
    });
  }

  return url;
};

async function processResponse<T>(response: Response): Promise<ApiResponseType<T>> {
  const successResponse = await response.json();

  return {
    data: successResponse?.data || successResponse || ([] as T),
    total: successResponse?.total || 0,
    totalPage: successResponse?.totalPages || 0,
    currentPage: successResponse?.currentPage || 0,
    status: response.status
  };
}

async function request<T>(
  endpoint: string,
  method: string = 'GET',
  options?: {
    filter?: SearchParamsFilterType;
    body?: unknown;
  }
): Promise<ApiResponseType<T>> {
  const cookieStore = await cookies();

  const session = cookieStore.get('session')?.value?.replace(',', '; ') || '';

  const url = createUrl(endpoint, options?.filter);
  const config = createRequestConfig(method, session, options?.body);

  const errorData = {
    data: [] as T,
    total: 0,
    totalPage: 0,
    currentPage: 0
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      return {
        ...errorData,
        status: response.status,
        errors: [{ message: 'Алдаа гарлаа!' }]
      };
    }

    return processResponse<T>(response);
  } catch (err) {
    return { ...errorData, errors: [{ message: `Алдаа гарлаа! ${err}` }] };
  }
}

export const apiService = {
  async getList<T>(resource: string, filter?: SearchParamsFilterType): Promise<ApiResponseType<T>> {
    const supplierId = (await getCookie('supplierId'))?.value || '';

    const extendedFilter = { limit: 10, supplierId, ...filter };

    return request<T>(resource, 'GET', { filter: removeEmptyStringFields(extendedFilter) });
  },

  async getOne<T>(resource: string, { id }: { id: string }): Promise<ApiResponseType<T>> {
    return request<T>(`${resource}/${id}`);
  },

  async patch<T, U>(resource: string, data: U): Promise<ApiResponseType<T>> {
    return request<T>(resource, 'PATCH', { body: data });
  },

  async create<T, U>(resource: string, data: U): Promise<ApiResponseType<T>> {
    return request<T>(resource, 'POST', { body: data });
  },

  async update<T, U>(resource: string, { id, data }: { id: string | string[]; data: U }): Promise<ApiResponseType<T>> {
    return request<T>(`${resource}/${id}`, 'PUT', { body: { ...data, id } });
  },

  async delete<T>(resource: string, { id }: { id: string }): Promise<ApiResponseType<T>> {
    return request<T>(`${resource}/${id}`, 'DELETE');
  }
};

export async function fetcher<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: T
): Promise<T | null> {
  const cookieStore = await cookies();

  const session = cookieStore.get('session')?.value?.replace(',', '; ') || '';

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: session
    },
    ...(body && { body: JSON.stringify(body) })
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log(`Error:`, error);

    return null;
  }
}

export async function uploadImageFetcher(formData: FormData) {
  try {
    const response = await fetch(`${MEDIA_UPLOAD}?ebazaar_admin_token=${process.env.ADMIN_TOKEN}&preset=product`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorMessage =
        response.status === 400 ? 'Зурагний формат буруу! (jpg, jpeg, png)' : 'Алдаа гарлаа. Дахин оролдоно уу!';

      return { message: errorMessage };
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log('Error uploading image:', err);
    return { message: 'Зураг оруулахад алдаа гарлаа!!! (jpg, jpeg, png)' };
  }
}
