import {
  Card,
  CardBody,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import { TableColumnType, TableItemType, TableSelection } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import CoreNotFound from '@/components/core/CoreNotFound';
import CoreTextInfo from '@/components/core/CoreTextInfo';
import { formatUnit } from '@/utils';

interface CoreTableProps<TableItemType> {
  data: TableItemType[];
  columns: TableColumnType[];
  renderCell: (item: TableItemType, columnKey: React.Key) => React.ReactNode;
  totalPage?: number;
  currentPage?: number;
  onRowAction?: (key: React.Key) => void;
  customTopContent?: React.ReactNode;
  onSelectionChange?: (key: TableSelection) => void;
  selectionMode?: boolean;
  total?: number;
  loading?: boolean;
  showIndex?: boolean;
}

const CoreTable: FunctionComponent<CoreTableProps<TableItemType>> = props => {
  const {
    columns,
    data,
    renderCell,
    totalPage = 0,
    currentPage = 0,
    onRowAction,
    customTopContent,
    onSelectionChange,
    selectionMode,
    total = 0,
    loading,
    showIndex = true
  } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setIsClient(true);
    setIsLoading(false);
  }, [data]);

  const onPageChange = useCallback(
    (value: number, type: string) => {
      const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

      if (type === 'limit') {
        currentParams.set('page', '1');
        setPageSize(value);
      }

      currentParams.set(type, value.toString());

      setIsLoading(true);
      changePathAction(`${pathname}?${currentParams}`);
    },
    [searchParams, setIsLoading, pathname, setPageSize]
  );

  const topContent = useMemo(() => {
    if (customTopContent)
      return (
        <Card>
          <CardBody>{customTopContent}</CardBody>
        </Card>
      );
  }, [customTopContent]);

  const bottomContent = useMemo(() => {
    return totalPage > 0 ? (
      <div className='py-2 px-2 flex justify-between items-center w-full gap-4'>
        <CoreTextInfo label='Нийт' value={formatUnit(total, 'ш')} />

        <Select
          aria-label='core'
          aria-hidden='false'
          disallowEmptySelection
          color='primary'
          variant='flat'
          classNames={{
            trigger: 'bg-content1'
          }}
          defaultSelectedKeys={[pageSize.toString()]}
          onChange={e => onPageChange(Number(e.target.value), 'limit')}
          items={[
            { key: '10', value: '10' },
            { key: '20', value: '20' },
            { key: '50', value: '50' },
            { key: '100', value: '100' }
          ]}
          className='max-w-20 mr-auto'
        >
          {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
        </Select>

        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={currentPage}
          total={totalPage}
          onChange={page => onPageChange(page, 'page')}
          classNames={{ wrapper: 'shadow-md', item: 'bg-content1', next: 'bg-content1', prev: 'bg-content1' }}
        />
      </div>
    ) : null;
  }, [currentPage, totalPage, onPageChange, total, pageSize]);

  const onDefaultRowAction = (key: React.Key) => {
    if (onRowAction) {
      setIsLoading(true);
      onRowAction(key);
    }
  };

  const onDefaultSelectionChange = (keys: TableSelection) => {
    if (onSelectionChange) {
      onSelectionChange(keys);
    }
  };

  const customColumns = showIndex ? [{ uid: 'index', label: '№' }, ...columns] : columns;

  return (
    <Table
      aria-label='custom cells'
      isHeaderSticky
      topContent={topContent}
      topContentPlacement='outside'
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      selectionMode={isClient && selectionMode ? 'multiple' : 'single'}
      onRowAction={onDefaultRowAction}
      onSelectionChange={onDefaultSelectionChange}
    >
      <TableHeader columns={customColumns}>
        {column => (
          <TableColumn key={column.uid} className='text-center'>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data ?? []} isLoading={loading || isLoading} emptyContent={<CoreNotFound />} loadingContent={<Spinner />}>
        {item => {
          const index = (currentPage - 1) * pageSize + data.findIndex(dataItem => dataItem.id === item.id) + 1;

          return (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell className='text-xs'>
                  <div className='flex items-center justify-center text-center'>
                    <div className='line-clamp-2'>{columnKey === 'index' ? index : renderCell(item, columnKey) || '--'}</div>
                  </div>
                </TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default CoreTable;
