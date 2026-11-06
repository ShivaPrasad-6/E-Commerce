// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios");

describe("Product", () => {
  const product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  };
  let fetchCartItems;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchCartItems = vi.fn();
  });

  it("renders product details, rating, and default quantity", () => {
    const { container } = render(
      <Product product={product} fetchCartItems={fetchCartItems} />,
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      product.image,
    );
    expect(container.querySelector(".product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );
    expect(screen.getByRole("combobox")).toHaveValue("1");
    expect(screen.getByText("Added")).toBeInTheDocument();
    expect(screen.getByText("Added").style.display).toBe("none");
  });

  it("updates quantity and adds the selected quantity to the cart", async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValue({});
    render(<Product product={product} fetchCartItems={fetchCartItems} />);

    await user.selectOptions(screen.getByRole("combobox"), "3");
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 3,
    });
    expect(fetchCartItems).toHaveBeenCalledOnce();
  });

  it("logs an error and does not refresh the cart when adding fails", async () => {
    const error = new Error("Request failed");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    axios.post.mockRejectedValue(error);
    render(<Product product={product} fetchCartItems={fetchCartItems} />);

    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(consoleError).toHaveBeenCalledWith("Error adding to cart:", error);
    expect(fetchCartItems).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
