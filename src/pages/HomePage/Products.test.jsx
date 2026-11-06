import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Products } from "./Products";

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
  {
    id: "shirt-product",
    image: "images/products/plain-hooded-fleece-sweatshirt.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: { stars: 4, count: 120 },
    priceCents: 2499,
    keywords: ["clothing"],
  },
];

describe("Products", () => {
  let fetchCartItems;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchCartItems = vi.fn();
  });

  it("fetches products and renders each product", async () => {
    axios.get.mockResolvedValue({ data: products });

    render(<Products fetchCartItems={fetchCartItems} />);

    expect(axios.get).toHaveBeenCalledWith("/api/products");
    expect(await screen.findByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText(products[1].name)).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByText("$24.99")).toBeInTheDocument();
  });

  it("renders no products when the API returns an empty list", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const { container } = render(
      <Products fetchCartItems={fetchCartItems} />,
    );

    await vi.waitFor(() => {
      expect(axios.get).toHaveResolvedWith({ data: [] });
    });
    expect(container.querySelectorAll(".product-container")).toHaveLength(0);
  });

  it("passes fetchCartItems to the rendered products", async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValue({ data: [products[0]] });
    axios.post.mockResolvedValue({});

    render(<Products fetchCartItems={fetchCartItems} />);

    await screen.findByText(products[0].name);
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: products[0].id,
      quantity: 1,
    });
    expect(fetchCartItems).toHaveBeenCalledOnce();
  });

  it("logs an error when fetching products fails", async () => {
    const error = new Error("Request failed");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValue(error);

    const { container } = render(
      <Products fetchCartItems={fetchCartItems} />,
    );

    await vi.waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Error fetching products:",
        error,
      );
    });
    expect(container.querySelectorAll(".product-container")).toHaveLength(0);
    consoleError.mockRestore();
  });
});
