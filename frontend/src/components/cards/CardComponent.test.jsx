import React from "react";
import { render, screen } from "@testing-library/react";
import CardComponent from "./CardComponent";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("CardComponent", () => {
  const exampleTrack = {
    id: "777",
    name: "Blast Off",
    artists: [{ name: "Silk Sonic" }],
    album: {
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/en/8/8e/Silk_Sonic_-_An_Evening_with_Silk_Sonic.png",
        },
      ],
    },
  };

  it("renders a card with all details", () => {
    render(<CardComponent track={exampleTrack} />);
    screen.debug();

    expect(screen.getByText("Blast Off")).toBeInTheDocument();
    expect(screen.getByText("Artist: Silk Sonic")).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /blast off/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/en/8/8e/Silk_Sonic_-_An_Evening_with_Silk_Sonic.png"
    );
  });
});
