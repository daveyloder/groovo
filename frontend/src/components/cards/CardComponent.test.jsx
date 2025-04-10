import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardComponent from "./CardComponent";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock the CSS module
vi.mock("./Card.module.css", () => ({
  default: {
    resultCard: "mockResultCard",
    clickableCard: "mockClickableCard",
    albumImage: "mockAlbumImage",
  },
}));

// Mock reactstrap components
vi.mock("reactstrap", () => ({
  Card: ({ children, className, onClick, role, tabIndex }) => (
    <div
      data-testid="card"
      className={className}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  ),
  CardBody: ({ children }) => <div data-testid="card-body">{children}</div>,
  CardTitle: ({ children, tag }) => {
    const Tag = tag || "div";
    return <Tag data-testid="card-title">{children}</Tag>;
  },
  CardText: ({ children }) => <div data-testid="card-text">{children}</div>,
  CardImg: ({ src, alt, className, top, width }) => (
    <img
      data-testid="card-img"
      src={src}
      alt={alt}
      className={className}
      width={width}
    />
  ),
}));

describe("CardComponent", () => {
  const mockTrack = {
    id: "123",
    name: "Test Track",
    artists: [{ name: "Artist 1" }, { name: "Artist 2" }],
  };

  const mockAlbumImage = "http://example.com/album.jpg";
  const mockOnClick = vi.fn();

  // Clean up after each test to prevent test interference
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks;
  });
  // Hans
  it("renders with the correct props", () => {
    render(
      <CardComponent
        track={mockTrack}
        albumImage={mockAlbumImage}
        onClick={mockOnClick}
      />
    );

    // Check if card elements are rendered
    expect(screen.getByTestId("card")).toBeDefined();
    expect(screen.getByTestId("card-img")).toBeDefined();
    expect(screen.getByTestId("card-body")).toBeDefined();
    expect(screen.getByTestId("card-title")).toBeDefined();

    // Check content
    expect(screen.getByTestId("card-title").textContent).toBe("Test Track");
    expect(screen.getByText(/Artist: Artist 1, Artist 2/i)).toBeDefined();

    // Check image props
    const img = screen.getByTestId("card-img");
    expect(img).toHaveAttribute("src", mockAlbumImage);
    expect(img).toHaveAttribute("alt", "Test Track");

    // Check card props
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("role", "button");
    expect(card).toHaveAttribute("tabIndex", "0");
    expect(card.className).toContain("mockResultCard");
    expect(card.className).toContain("mockClickableCard");
  });
  // David
  it("calls onClick when Enter or Space is pressed", () => {
    render(
      <CardComponent
        track={mockTrack}
        albumImage={mockAlbumImage}
        onClick={mockOnClick}
      />
    );

    const card = screen.getAllByTestId("card")[0]; // use the first card

    fireEvent.keyDown(card, { key: "Enter", code: "Enter", charCode: 13 });
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: " ", code: "Space", charCode: 32 });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  // Mike
  it("calls onClick when clicked", () => {
    render(
      <CardComponent
        track={mockTrack}
        albumImage={mockAlbumImage}
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getAllByTestId("card")[0]); // or [1], depending on which should be clickable

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  // Blake
  it("handles tracks without artists array", () => {
    const trackWithoutArtists = {
      id: "456",
      name: "No Artists Track",
    };

    render(
      <CardComponent
        track={trackWithoutArtists}
        albumImage={mockAlbumImage}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(/Artist: Unknown Artist/i)).toBeDefined();
  });
});
