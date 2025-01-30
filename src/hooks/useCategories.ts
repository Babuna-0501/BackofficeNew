'use client';

import { getCategoriesAction } from '@/app/actions/category';
import { CategoryType } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export type UseCategoriesProps = {
  fetchDelay?: number;
};

export function useCategories({ fetchDelay = 0 }: UseCategoriesProps = {}) {
  const [state, setState] = useState({
    items: [] as CategoryType[],
    isLoading: false,
    hasMore: true,
    page: 1,
    searchValue: ''
  });

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const loadItems = useCallback(
    async (page: number, name: string) => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));

        if (page > 1) {
          await new Promise(resolve => setTimeout(resolve, fetchDelay));
        }

        const { data, hasMore } = await getCategoriesAction({ page, name });

        setState(prev => ({
          ...prev,
          items: page === 1 ? data : [...prev.items, ...data],
          hasMore,
          isLoading: false
        }));
      } catch (error) {
        console.error('Error fetching categories:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    },
    [fetchDelay]
  );

  useEffect(() => {
    loadItems(state.page, state.searchValue);
  }, [state.page, state.searchValue, loadItems]);

  const onLoadMore = useCallback(() => {
    if (!state.isLoading && state.hasMore) {
      setState(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [state.isLoading, state.hasMore]);

  const onSearchValue = useCallback(
    (newSearchValue: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        setState(prev => ({
          ...prev,
          searchValue: newSearchValue,
          page: 1,
          items: []
        }));
      }, 1500);

      setDebounceTimeout(timeout);
    },
    [debounceTimeout]
  );

  return {
    items: state.items,
    hasMore: state.hasMore,
    isLoading: state.isLoading,
    onLoadMore,
    searchValue: state.searchValue,
    onSearchValue
  };
}
