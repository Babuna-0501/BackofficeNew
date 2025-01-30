'use server';

import { createFeatured, deleteFeatured, getFeaturedOne, updateFeatured } from '@/services';
import { revalidatePath } from 'next/cache';

export async function getFeaturedAction(id: string) {
  return await getFeaturedOne(id);
}

export async function createFeaturedAction(data: any) {
  return await createFeatured(data);
}

export async function updateFeaturedAction(data: any, id: string) {
  const response = await updateFeatured(data, id);
  revalidatePath(`/Featured/${id}`);
  return response;
}

export async function deleteFeaturedAction(id: string) {
  const response = await deleteFeatured(id);
  revalidatePath(`/Featured`);
  return response;
}
