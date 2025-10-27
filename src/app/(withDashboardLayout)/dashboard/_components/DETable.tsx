"use client";
import { useRouter } from "next/navigation";
import useUserData from "@/src/hooks/user.hook";
import { getCurrentUser } from "@/src/services/auth";
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
  redirectByRowClick,
  pagination,
  setPagination,
  notFoundMessage,
}: {
  data: TResponse<any>;
  pagination: { limit: number; page: number };
  rows: Trow[];
  columns: TColumn[];
  isLoading: boolean;
  redirectByRowClick?: string;
  setPagination: (pagination: { limit: number; page: number }) => void;
  notFoundMessage: string;
}) => {
  const { isLoading: isLoadingUser, user } = useUserData();
  const router = useRouter();

  // console.log({ data, rows, notFoundMessage });

  return (

      <Table
        className="my-5"
        color="primary"
        aria-label="DE table"
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
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoadingUser || isLoading}
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
              key={item._id}
              className={`
            ${
              redirectByRowClick
                ? `cursor-pointer border-b border-slate-300 hover:scale-[1.01] hover:opacity-80 transition-all`
                : item.isDeleted || user?._id === item?.user?._id
                ? "bg-red-50 pointer-events-none blur-[.5px]"
                : ""
            }
            `}
              onClick={() => {
                redirectByRowClick &&
                  router.push(`${redirectByRowClick}/${item._id}`);
              }}
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
