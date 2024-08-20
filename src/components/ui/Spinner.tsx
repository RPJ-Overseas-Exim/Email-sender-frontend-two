export default function Spinner({
  h = "48",
  w = "48",
  b = "5",
}: {
  h?: string;
  w?: string;
  b?: string;
}) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-foreground border-e-deepBlue"
      style={{
        height: h + "px",
        width: w + "px",
        borderWidth: b + "px",
      }}
    ></span>
  );
}
