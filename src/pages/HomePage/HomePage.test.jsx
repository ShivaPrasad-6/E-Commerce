import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import axios from "axios";
import HomePage from "./HomePage";

vi.mock("axios");

const products = [
  {
    id: "sock-product",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: { stars: 4.5, count: 87 },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  },
];

function CurrentPath() {
  const location = useLocation();
  return <span data-testid="current-path">{location.pathname}</span>;
}

function renderHomePage({ cart = [], fetchCartItems = vi.fn() } = {}) {
  render(
    <MemoryRouter>
      <HomePage cart={cart} fetchCartItems={fetchCartItems} />
      <CurrentPath />
    </MemoryRouter>,
  );
  return { fetchCartItems };
}

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: products });
    axios.post.mockResolvedValue({});
  });

  it("renders the header, cart quantity, and fetched product", async () => {
    renderHomePage({ cart: [{ quantity: 2 }] });

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(await screen.findByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith("/api/products");
  });

  it("navigates to the orders page from the header", async () => {
    const user = userEvent.setup();
    renderHomePage();

    await user.click(screen.getByText("Orders"));

    expect(screen.getByTestId("current-path")).toHaveTextContent("/orders");
  });

  it("adds the selected product quantity to the cart", async () => {
    const user = userEvent.setup();
    const { fetchCartItems } = renderHomePage();

    await screen.findByText(products[0].name);
    await user.selectOptions(screen.getByRole("combobox"), "3");
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: products[0].id,
      quantity: 3,
    });
    expect(fetchCartItems).toHaveBeenCalledOnce();
  });
});
