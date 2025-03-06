import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import UrlInput from "./Input";
import { useSourceDataManager } from "../../utils/ApiDataRequest/externalApiRequest";

vi.mock("../../utils/ApiDataRequest/externalApiRequest", () => ({
    useSourceDataManager: vi.fn(),
}));

describe("UrlInput component", () => {
    it("Render inputArea and button", () => {
        render(<UrlInput />);
        expect(screen.getByPlaceholderText("Enter repository URL")).toBeInTheDocument();
        expect(screen.getByText("Load")).toBeInTheDocument();
    });

    it("Change value", async () => {
        render(<UrlInput />);
        const input = screen.getByPlaceholderText("Enter repository URL");

        await userEvent.type(input, "https://github.com/user/repo");
        expect(input).toHaveValue("https://github.com/user/repo");
    });

    it("Clear placeholder", async () => {
        render(<UrlInput />);
        const input = screen.getByPlaceholderText("Enter repository URL");
        await userEvent.click(input);
        expect(input).toHaveAttribute("placeholder", "");
    });

    it("Return placeholder without focus", async () => {
        render(<UrlInput />);
        const input = screen.getByPlaceholderText("Enter repository URL");
        
        await userEvent.click(input);
        await userEvent.tab();
        expect(input).toHaveAttribute("placeholder", "Enter repository URL");
    });

    it("Показывает alert при пустом вводе", async () => {
        window.alert = vi.fn();
        render(<UrlInput />);
    
        const button = screen.getByText("Load");
        await userEvent.click(button);
    
        expect(window.alert).toHaveBeenCalledWith("Please enter a valid GitHub repository URL!");
      });

      it("Correct call `useSourceDataManager` if Url is valid", async () => {
        render(<UrlInput />);
        const input = screen.getByPlaceholderText("Enter repository URL");
        const button = screen.getByText("Load");
        await userEvent.type(input, "https://github.com/user/repo");
        await userEvent.click(button);
        
        expect(useSourceDataManager).toHaveBeenCalledWith({
            ownerName: "user",
            repository: "repo",
          });
      });

      it("if Url is not valid popup alert", async () => {
        window.alert = vi.fn();
        render(<UrlInput />);
        const input = screen.getByPlaceholderText("Enter repository URL");
        const button = screen.getByText("Load");
    
        await userEvent.type(input, "invalid-url");
        await userEvent.click(button);
    
        expect(window.alert).toHaveBeenCalledWith("Please enter a valid GitHub repository URL!");
      });
    });