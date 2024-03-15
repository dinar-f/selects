import '@testing-library/jest-dom'
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

const RBcities = ["Минск", "Гомель"];
const citiesRus = ["Москва", "Сочи"];

test("enabled next select after previous", async () => {
    render(<App />)
    const countrySelest = screen.getByRole("combobox", { name: "country" });
    const citySelect = screen.getByRole("combobox", { name: "city" });
    const accommodationSelect = screen.getByRole("combobox", {
        name: "accommodation",
    });

    expect(countrySelest).not.toBeDisabled();
    expect(citySelect).toBeDisabled();
    expect(accommodationSelect).toBeDisabled();

    userEvent.selectOptions(
        countrySelest,
        screen.getByRole("option", { name: "Россия" })
    )

    await waitFor(() => {
        expect(citySelect).not.toBeDisabled();
    });

    expect(accommodationSelect).toBeDisabled();

    userEvent.selectOptions(
        citySelect,
        screen.getByRole("option", { name: "Москва" })
    );

    await waitFor(() => {
        expect(accommodationSelect).not.toBeDisabled();
    });

})

test("button disabled when any selector is empty", async () => {
    render(<App />)

    const countrySelest = screen.getByRole("combobox", { name: "country" });
    const citySelect = screen.getByRole("combobox", { name: "city" });
    const accommodationSelect = screen.getByRole("combobox", {
        name: "accommodation",
    });
    const submitButton = screen.findByText(/отправить/i)


    userEvent.selectOptions(
        countrySelest,
        screen.getByRole("option", { name: "Россия" })
    )

    await waitFor(() => {
        expect(citySelect).not.toBeDisabled();
    });

    expect(submitButton).toBeDisabled

    userEvent.selectOptions(
        citySelect,
        screen.getByRole("option", { name: "Москва" })
    );

    expect(submitButton).toBeDisabled

    userEvent.selectOptions(
        accommodationSelect,
        screen.getByRole("option", { name: "Аренда" })
    );

    expect(submitButton).not.toBeDisabled
})

test("different cities lists, depending on the country", async () => {
    render(<App />)

    const countrySelest = screen.getByRole("combobox", { name: "country" });
    const citySelect = screen.getByRole("combobox", { name: "city" });

    userEvent.selectOptions(
        countrySelest,
        screen.getByRole("option", { name: "Беларусь" })
    );

    await waitFor(() => {
        expect(citySelect).not.toBeDisabled();
    });

    const RBOptionCities = within(
        screen.getByRole("combobox", { name: "city" })
    ).getAllByRole("option");

    RBOptionCities
        .filter((option) => option.innerHTML !== "-- Select value --")
        .forEach((option) => {
            expect(RBcities.includes(option?.innerHTML)).toBeTruthy();
        });

    userEvent.selectOptions(
        countrySelest,
        screen.getByRole("option", { name: "Россия" })
    );

    await waitFor(() => {
        expect(screen.getByText("Россия")).toBeInTheDocument();
    });

    const RussiaOptionCities = within(
        screen.getByRole("combobox", { name: "city" })
    ).getAllByRole("option");

    RussiaOptionCities
        .filter((option) => option.innerHTML !== "-- Select value --")
        .forEach((option) => {
            expect(citiesRus.includes(option?.innerHTML)).toBeTruthy();
        });
})