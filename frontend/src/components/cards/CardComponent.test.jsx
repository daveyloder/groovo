import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardComponent from "./CardComponent";

describe("CardComponent", () => {
  const mockTrack = {
    id: "123",
    name: "Test Track Name",
    artists: [{ name: "Artist 1" }, { name: "Artist 2" }],
    album: {
      images: [{ url: "https://example.com/album-image.jpg" }],
    },
  };

  it("renders track information correctly", () => {
    render(<CardComponent track={mockTrack} />);

    // Check if track name is rendered in a heading (CardTitle uses h5)
    expect(
      screen.getByRole("heading", { name: "Test Track Name" })
    ).toBeInTheDocument();

    // Check if artists are rendered correctly
    expect(screen.getByText("Artist: Artist 1, Artist 2")).toBeInTheDocument();

    // Check if the image is rendered with correct attributes
    const image = screen.getByAltText("Test Track Name");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/album-image.jpg");
  });

  it("handles tracks with missing image data", () => {
    const trackWithoutImage = {
      ...mockTrack,
      album: {
        images: [],
      },
    };

    render(<CardComponent track={trackWithoutImage} />);

    // Use getByRole to specifically target the heading
    expect(
      screen.getByRole("heading", { name: "Test Track Name" })
    ).toBeInTheDocument();

    // Image should not be present or should have undefined src
    const image = screen.getByAltText("Test Track Name");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "");
    expect(screen.getByTestId("track-title")).toHaveTextContent(
      "Test Track Name"
    );
  });
});
