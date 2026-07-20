// Card para carregar mais

interface CarregarMaisCardProps {
  onClick: () => void;
}

export default function CarregarMaisCard({ onClick }: CarregarMaisCardProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Carregar mais projetos"
      className="flex items-center justify-center max-w-67 h-43 border-2 border-dashed border-gray-400 rounded-xs bg-transparent hover:bg-black/5 hover:border-black hover:scale-105 transition ease-in-out duration-200 cursor-pointer group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 256 256"
        className="text-gray-400 group-hover:text-black transition-colors duration-200"
        fill="currentColor"
      >
        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
      </svg>
    </button>
  );
}
