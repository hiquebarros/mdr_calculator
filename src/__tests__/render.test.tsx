import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import React from "react";
import App from "./../App"


describe("Testing conditional render", () => {
  test("should be able to display the default result (Amanhã,15,30,90)", async () => {
    render(<App></App>)
    const amountField = screen.getByTestId(1)
    const installmentsField = screen.getByTestId(2)
    const mdrField = screen.getByTestId(3)
    const buttonElement = screen.getByText("Simular");
    fireEvent.change(amountField, { target: { value: "1000" } })
    fireEvent.change(installmentsField, { target: { value: "6" } })
    fireEvent.change(mdrField, { target: { value: "15" } })
    fireEvent.click(buttonElement)

    
    await waitFor(() => {
      const partialDefaultResultField = screen.getAllByTestId(5)
      expect(partialDefaultResultField.length).toBe(4)
    })
  });

});

describe("dsa", () => {
  test("dsa", async () => {
    
      render(<App></App>)
      const amountField = screen.getByTestId(1)
      const installmentsField = screen.getByTestId(2)
      const mdrField = screen.getByTestId(3)
      const daysField = screen.getByTestId(4)
      const buttonElement = screen.getByText("Simular");

      
      act(() =>{
        fireEvent.change(amountField, { target: { value: "1000" } })
        fireEvent.change(installmentsField, { target: { value: "6" } })
        fireEvent.change(mdrField, { target: { value: "15" } })
        fireEvent.change(daysField, { target: { value: "1,15,25,40,50" } })
        fireEvent.click(buttonElement)
      })

      await waitFor(() => {
        const partialSpecificResultField = screen.getAllByTestId(6)
        expect(partialSpecificResultField.length).toBe(5)
      })
  })
})