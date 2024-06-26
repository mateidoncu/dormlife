export const metadata = {
    title: "Next.js",
    desription: "Generated by Next.js"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}