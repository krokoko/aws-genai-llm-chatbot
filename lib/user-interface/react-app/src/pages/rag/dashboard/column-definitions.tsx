import { StatusIndicator, TableProps } from "@cloudscape-design/components";
import {
  PropertyFilterProperty,
  PropertyFilterOperator,
} from "@cloudscape-design/collection-hooks";
import { WorkspaceItem } from "../../../common/types";
import { Labels } from "../../../common/constants";
import { DateTime } from "luxon";
import RouterLink from "../../../components/wrappers/router-link";

export const WorkspacesColumnDefinitions: TableProps.ColumnDefinition<WorkspaceItem>[] =
  [
    {
      id: "name",
      header: "Name",
      sortingField: "name",
      cell: (item: WorkspaceItem) => (
        <RouterLink href={`/rag/workspaces/${item.id}`}>{item.name}</RouterLink>
      ),
      isRowHeader: true,
    },
    {
      id: "engine",
      header: "Engine",
      sortingField: "engine",
      cell: (item: WorkspaceItem) => Labels.engineMap[item.engine],
    },
    {
      id: "starus",
      header: "Status",
      sortingField: "status",
      cell: (item) => (
        <StatusIndicator type={Labels.statusTypeMap[item.status]}>
          {Labels.statusMap[item.status]}
        </StatusIndicator>
      ),
      minWidth: 120,
    },
    {
      id: "documents",
      header: "Documents",
      sortingField: "documents",
      cell: (item: WorkspaceItem) => item.documents,
    },
    {
      id: "timestamp",
      header: "Creation Date",
      sortingField: "timestamp",
      cell: (item: WorkspaceItem) =>
        DateTime.fromISO(new Date(item.createdAt).toISOString()).toLocaleString(
          DateTime.DATETIME_SHORT
        ),
      sortingComparator(a, b) {
        return a.createdAt.localeCompare(b.createdAt);
      },
    },
  ];

export const WorkspaceColumnFilteringProperties: PropertyFilterProperty[] = [
  {
    propertyLabel: "Name",
    key: "name",
    groupValuesLabel: "Name values",
    operators: [":", "!:", "=", "!="] as PropertyFilterOperator[],
  },
  {
    propertyLabel: "Engine",
    key: "engine",
    groupValuesLabel: "Engine values",
    operators: [":", "!:", "=", "!="] as PropertyFilterOperator[],
  },
  {
    propertyLabel: "Status",
    key: "status",
    groupValuesLabel: "Status values",
    operators: [":", "!:", "=", "!="] as PropertyFilterOperator[],
  },
  {
    propertyLabel: "Documents",
    key: "documents",
    groupValuesLabel: "Documents",
    defaultOperator: ">" as PropertyFilterOperator,
    operators: ["<", "<=", ">", ">="] as PropertyFilterOperator[],
  },
].sort((a, b) => a.propertyLabel.localeCompare(b.propertyLabel));
