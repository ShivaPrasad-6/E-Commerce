// @vitest-environment jsdom

import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios");

describe("Product", () => {
  let product;
  let fetchCartItems;
  beforeEach(() => {
    fetchCartItems = vi.fn();
    product = {
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
  });

  it("should render product details correctly", () => {
    render(<Product product={product} fetchCartItems={fetchCartItems} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByText("87")).toBeInTheDocument();
    const image = screen.getByTestId("product-image");
    expect(image).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
  });

  it("should call fetchCartItems when Add to Cart button is clicked", async () => {
    render(<Product product={product} fetchCartItems={fetchCartItems} />);

    const user = userEvent.setup();
    screen.getByTestId("add-to-cart-button");
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 1, // Default quantity is 1
    });
    expect(fetchCartItems).toHaveBeenCalled();
  });
});
