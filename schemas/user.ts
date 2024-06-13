import { defineField } from "sanity";

const user = {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: "isAdmin",
            title: "Is Admin",
            type: "boolean",
            description: "Check if user is admin",
            initialValue: false,
            validation: Rule => Rule.required(),
            // readOnly: true,
            // hidden: true,
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            description: "Name of user",
            validation: Rule => Rule.required(),
            readOnly: true,
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            description: "Email of user",
        }),
        defineField({
            name: "emailVerified",
            type: "date",
            hidden: true,
        }),
        defineField({
            name: "password",
            type: "string",
            hidden: true,
        }),
        defineField({
            name: "about",
            title: "About",
            type: "text",
            description: "Description about user"
        }),
        defineField({
            name: "faculty",
            title: "Faculty",
            type: "string",
            description: "Faculty of user"
        }),
        defineField({
            name: "yearOfStudy",
            title: "Year of study",
            type: "number",
        }),
    ],
};

export default user;