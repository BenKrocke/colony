import { Resources } from "../../classes/Resources";

const ResourcesDisplay = ({ resources }: { resources: Resources }) => {
    return (
        <div className="bg-[#472d3c] text-white px-8 py-4 border-b-2 border-gray-500">
            Wood: {resources.wood}
        </div>
    )
}

export default ResourcesDisplay;