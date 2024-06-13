import { defineField } from "sanity";

const rent = {
    name: "rent",
    title: "Rent",
    type: "document",
    fields: [
        defineField({
            name:"user",
            title: "User",
            type: "reference",
            to: [{type: "user"}],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "dormRoom",
            title: "Dorm Room",
            type: "reference",
            to: [{type: "dormRoom"}],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "contractStartDate",
            title: "Contract Starting Date",
            type: "date",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "contractEndDate",
            title: "Contract Ending Date",
            type: "date",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "numberOfMonths",
            title: "Number of Months",
            type: "number",
            initialValue: 1,
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: "people",
            title: "Number of people in same room",
            type: "number",
            initialValue: 1,
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: Rule => Rule.required().min(0),
        }),

    ],
};

export default rent;