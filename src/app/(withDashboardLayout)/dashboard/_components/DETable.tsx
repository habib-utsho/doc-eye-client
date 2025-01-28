"use client";
import { TColumn, TResponse, Trow } from "@/src/types";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

const DETable = ({
  data,
  rows,
  columns,
  isLoading,
  pagination,
  setPagination,
  notFoundMessage,
}: {
  data: TResponse<any>;
  pagination: { limit: number; page: number };
  rows: Trow[];
  columns: TColumn[];
  isLoading: boolean;
  setPagination: (pagination: { limit: number; page: number }) => void;
  notFoundMessage: string;
}) => {
  return (
    <Table
      className="my-5"
      color="primary"
      aria-label="Example static collection table"
      bottomContent={
        data?.meta?.page!! > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={pagination.page}
              total={data?.meta?.totalPage}
              onChange={(page) => setPagination({ ...pagination, page })}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        emptyContent={
          <h2 className="text-primary font-bold text-2xl">
            {notFoundMessage || "No data found"}
          </h2>
        }
        items={rows || []}
        loadingContent={<Spinner />}
      >
        {(item: any) => (
          <TableRow
            key={item.name}
            className={`${
              item.isDeleted ? "bg-red-50 pointer-events-none blur-[.6px]" : ""
            }`}
          >
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DETable;
