export function renderContent(content: any[]) {
  return content.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={index}>{block.children.map((child: any) => child.text)}</p>;
      // tu peux ajouter d'autres types si besoin (heading, list, etc.)
      default:
        return null;
    }
  });
}