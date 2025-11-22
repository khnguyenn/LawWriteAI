import { ContextArea } from "@/components/ContextArea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white min-h-screen p-8">
      {/* Context Area Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Assignment 1
        </h1>
        <div className="grid grid-cols-2 gap-8">
          <ContextArea
            mode="sample"
            title="Sample Text"
            sampleText="This is a sample text."
          />
          <ContextArea mode="typing" title="Your Text" />
        </div>
      </div>

      {/* Button Section */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-6 flex-wrap">
          <Button className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-bright-red hover:text-white hover:border-bright-red hover:shadow-lg active:scale-95 transition-all duration-200">
            Submit
          </Button>
          <Button className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-charcoal hover:text-white hover:border-charcoal hover:shadow-lg active:scale-95 transition-all duration-200">
            Reset
          </Button>
          <Button className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-purple hover:text-white hover:border-purple hover:shadow-lg active:scale-95 transition-all duration-200">
            Log
          </Button>
          <Button className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-deep-red hover:text-white hover:border-deep-red hover:shadow-lg active:scale-95 transition-all duration-200">
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
}
