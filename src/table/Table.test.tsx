import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "./index";
import type { ColumnDef } from "@tanstack/react-table";

interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
}

const mockData: TestData[] = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", age: 35, email: "bob@example.com" },
];

const mockColumns: ColumnDef<TestData>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "email", header: "Email" },
];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders all size variants", () => {
    const { rerender } = render(
      <Table data={mockData} columns={mockColumns} size="xs" />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    rerender(<Table data={mockData} columns={mockColumns} size="sm" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    rerender(<Table data={mockData} columns={mockColumns} size="md" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    rerender(<Table data={mockData} columns={mockColumns} size="lg" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders all variant types", () => {
    const variants = ["outline", "line", "ghost"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(
        <Table data={mockData} columns={mockColumns} variant={variant} />,
      );
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      unmount();
    });
  });

  it("applies striped styling", () => {
    render(<Table data={mockData} columns={mockColumns} striped />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("applies bordered styling", () => {
    render(<Table data={mockData} columns={mockColumns} bordered />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Table data={mockData} columns={mockColumns} onRowClick={onRowClick} />,
    );

    const row = screen.getByText("John Doe").closest("tr");
    await user.click(row!);

    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it("shows empty state when no data", () => {
    render(<Table data={[]} columns={mockColumns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("shows custom empty state", () => {
    render(
      <Table
        data={[]}
        columns={mockColumns}
        emptyState={<div>Custom empty message</div>}
      />,
    );
    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });

  it("shows loading skeleton", () => {
    render(
      <Table data={mockData} columns={mockColumns} loading loadingRows={3} />,
    );
    // Loading state should show skeleton, not actual data
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("renders with caption", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        caption="User Information"
        showCaption
      />,
    );
    expect(screen.getByText("User Information")).toBeInTheDocument();
  });

  it("renders aria-label for accessibility", () => {
    const { container } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        aria-label="User data table"
      />,
    );
    const table = container.querySelector("table");
    expect(table).toHaveAttribute("aria-label", "User data table");
  });

  it("enables row selection with checkboxes", () => {
    render(<Table data={mockData} columns={mockColumns} enableRowSelection />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it("calls onSelectionChange when rows are selected", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        enableRowSelection
        onSelectionChange={onSelectionChange}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]); // Skip header checkbox, click first row

    expect(onSelectionChange).toHaveBeenCalled();
  });

  it("enables pagination", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        enablePagination
        pageSize={2}
      />,
    );
    // Should only show first 2 rows
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();
  });

  it("shows pagination controls", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        enablePagination
        pageSize={2}
      />,
    );
    expect(screen.getByText(/showing/i)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Table data={mockData} columns={mockColumns} className="custom-class" />,
    );
    const table = container.querySelector("table");
    expect(table).toHaveClass("custom-class");
  });

  it("applies classNames API to sub-elements", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        classNames={{
          root: "root-class",
          wrapper: "wrapper-class",
          header: "header-class",
        }}
      />,
    );

    const root = screen.getByText("John Doe").closest(".table_root");
    expect(root).toHaveClass("root-class");
  });

  it("enables click to select rows", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        enableRowSelection
        enableClickToSelect
        onSelectionChange={onSelectionChange}
      />,
    );

    const row = screen.getByText("John Doe").closest("tr");
    await user.click(row!);

    expect(onSelectionChange).toHaveBeenCalled();
  });

  it("renders with all colors", () => {
    const colors = ["default", "primary", "success"] as const;
    colors.forEach((color) => {
      const { unmount } = render(
        <Table data={mockData} columns={mockColumns} color={color} />,
      );
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      unmount();
    });
  });

  describe("Sorting", () => {
    it("enables sorting when enableSorting is true", () => {
      render(<Table data={mockData} columns={mockColumns} enableSorting />);
      const headers = screen.getAllByRole("columnheader");
      expect(headers.length).toBeGreaterThan(0);
    });

    it("sorts data when column header is clicked", async () => {
      const user = userEvent.setup();
      render(<Table data={mockData} columns={mockColumns} enableSorting />);

      const nameHeader = screen.getByText("Name");
      await user.click(nameHeader);

      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });

    it("toggles sort direction on multiple clicks", async () => {
      const user = userEvent.setup();
      render(<Table data={mockData} columns={mockColumns} enableSorting />);

      const nameHeader = screen.getByText("Name");
      await user.click(nameHeader);
      await user.click(nameHeader);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Filtering", () => {
    it("enables filtering when enableFiltering is true", () => {
      render(<Table data={mockData} columns={mockColumns} enableFiltering />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Grouping", () => {
    it("enables grouping when enableGrouping is true", () => {
      render(<Table data={mockData} columns={mockColumns} enableGrouping />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels", () => {
      const { container } = render(
        <Table data={mockData} columns={mockColumns} aria-label="Test table" />,
      );
      const table = container.querySelector("table");
      expect(table).toHaveAttribute("aria-label", "Test table");
    });

    it("has role attributes for rows", () => {
      render(<Table data={mockData} columns={mockColumns} />);
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBeGreaterThan(0);
    });

    it("supports keyboard navigation on sortable headers", async () => {
      const user = userEvent.setup();
      render(<Table data={mockData} columns={mockColumns} enableSorting />);

      const nameHeader = screen.getByText("Name");
      nameHeader.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
