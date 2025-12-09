export function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center w-full py-10">
            <div className="w-12 h-12 border-8 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
    )
}