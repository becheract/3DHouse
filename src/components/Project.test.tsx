import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Project from "./Project";
import { useThree } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import { expect, jest, test, describe, beforeEach } from "@jest/globals";

jest.mock("@react-three/fiber", () => ({
  useThree: jest.fn(),
  useFrame: jest.fn(),
}));

jest.mock("@react-three/cannon", () => ({
  useBox: jest.fn(),
}));

describe("Project Component", () => {
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockHandleHover = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useBox as jest.Mock).mockReturnValue([React.createRef()]);
    (useThree as jest.Mock).mockReturnValue({
      camera: { position: new THREE.Vector3(0, 0, 0) },
    });
  });

  test("renders without crashing", () => {
    const { getByRole } = render(
      <Project
        textDescription="Test Description"
        handleHover={mockHandleHover}
        openModal={mockOpenModal}
        closeModal={mockCloseModal}
      />
    );

    expect(getByRole("mesh")).toBeInTheDocument();
  });

  test("shows interact text on pointer over if within distance", () => {
    (useThree as jest.Mock).mockReturnValue({
      camera: { position: new THREE.Vector3(4.1, 0, 0) }, // within threshold distance of 3
    });

    const { getByRole } = render(
      <Project
        textDescription="Test Description"
        handleHover={mockHandleHover}
        openModal={mockOpenModal}
        closeModal={mockCloseModal}
      />
    );

    const mesh = getByRole("mesh");
    fireEvent.pointerOver(mesh);

    expect(mockHandleHover).toHaveBeenCalledWith(true);
  });

  test("hides interact text on pointer leave", () => {
    const { getByRole } = render(
      <Project
        textDescription="Test Description"
        handleHover={mockHandleHover}
        openModal={mockOpenModal}
        closeModal={mockCloseModal}
      />
    );

    const mesh = getByRole("mesh");
    fireEvent.pointerOver(mesh);
    fireEvent.pointerLeave(mesh);

    expect(mockHandleHover).toHaveBeenCalledWith(false);
  });

  test('calls openModal when "f" key is pressed and within range', () => {
    (useThree as jest.Mock).mockReturnValue({
      camera: { position: new THREE.Vector3(4.1, 0, 0) }, // within threshold distance of 3
    });

    const { getByRole } = render(
      <Project
        textDescription="Test Description"
        handleHover={mockHandleHover}
        openModal={mockOpenModal}
        closeModal={mockCloseModal}
      />
    );

    const mesh = getByRole("mesh");
    fireEvent.pointerOver(mesh);

    fireEvent.keyDown(window, { key: "f" });
    expect(mockOpenModal).toHaveBeenCalled();
  });

  test('does not call openModal when "f" key is pressed and out of range', () => {
    (useThree as jest.Mock).mockReturnValue({
      camera: { position: new THREE.Vector3(10, 0, 0) }, // outside threshold distance
    });

    const { getByRole } = render(
      <Project
        textDescription="Test Description"
        handleHover={mockHandleHover}
        openModal={mockOpenModal}
        closeModal={mockCloseModal}
      />
    );

    const mesh = getByRole("mesh");
    fireEvent.pointerOver(mesh);

    fireEvent.keyDown(window, { key: "f" });
    expect(mockOpenModal).not.toHaveBeenCalled();
  });

  test('calls closeModal when "x" key is pressed', () => {
    const { getByRole } = render(
      <Project
        textDescription="Test Description"
        handleHover={mockHandleHover}
        openModal={mockOpenModal}
        closeModal={mockCloseModal}
      />
    );

    const mesh = getByRole("mesh");
    fireEvent.pointerOver(mesh);

    fireEvent.keyDown(window, { key: "x" });
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
