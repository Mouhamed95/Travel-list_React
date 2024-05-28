export default function Stats({ items }) {
  if (!items.length) return (
    <p className="stats">
      <em>
        Start adding some items to yourpacking list
      </em>
    </p>
  );
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const pourcentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {pourcentage === 100 ? 'Vous avez compris, Pret a partit ✈ ' :
          `🧳 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${pourcentage} %)`}
      </em>
    </footer>
  );
}
