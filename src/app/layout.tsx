import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <link
          href="https://fonts.cdnfonts.com/css/gameovercre"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
