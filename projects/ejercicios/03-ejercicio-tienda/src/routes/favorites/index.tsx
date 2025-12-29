import { createFileRoute } from '@tanstack/react-router'

import { FavoriteProductCard } from "../../components/Favorites";
import { useFavoriteStore } from '../../store/favoritesStore';



export const Route = createFileRoute('/favorites/')({
    component: FavoritesComponent,
});



function FavoritesComponent() {
    const favorites = useFavoriteStore((state) => state.favorites);
    const borrarFavoritos = useFavoriteStore((state) => state.borrarFavoritos);

    return (
        <div>

            {/* Encabezado + botón alineado a la derecha */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Mis Favoritos
                </h1>

                {favorites.length > 0 && (
                    <div className="relative group">
                        <button
                            onClick={borrarFavoritos}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition shadow"
                        >
                            {/* Ícono color gris plomo */}
                            <img
                                src="/trash-2.svg"
                                alt="Eliminar favoritos"
                                className="w-8 h-8 opacity-80 hover:opacity-100"
                            />
                        </button>

                        {/* Tooltip hacia la derecha */}
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                           hidden group-hover:block bg-black text-white text-xs 
                           py-1 px-2 rounded shadow whitespace-nowrap">
                            Borrar todos tus favoritos
                        </span>
                    </div>
                )}
            </div>

            {/* Contenido */}
            {favorites.length === 0 ? (
                <p className="text-gray-600">Todavía no agregaste productos a favoritos.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favorites.map((product) => (
                        <FavoriteProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
