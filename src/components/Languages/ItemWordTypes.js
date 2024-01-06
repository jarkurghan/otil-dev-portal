export default function Item({ data }) {
    return (
        <li>
            <div className={"block hover:bg-gray-50 transition duration-200"}>
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="truncate text-lg font-medium text-indigo-600 capitalize">{data.type}</div>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">{data.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
