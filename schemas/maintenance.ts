import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'maintenance',
  title: 'Maintenance Request',
  type: 'document',
  fields: [
    defineField({
        name:"rent",
        title: "Rent",
        type: "reference",
        to: [{type: "rent"}],
        validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'reason',
      title: 'Reason',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Closed', value: 'closed' }
        ]
      }
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'scheduledDate',
      title: 'Scheduled Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    })
  ],
});
