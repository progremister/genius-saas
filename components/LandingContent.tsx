"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
        name: "Joe",
        avatar: "J",
        title: "Copywriter",
        description: "This AI is really awesome!"
    },
    {
        name: "David",
        avatar: "D",
        title: "Software Developer",
        description: "Trully the best AI tool."
    },
    {
        name: "Lara",
        avatar: "L",
        title: "Designer",
        description: "This tool helped me a lot!"
    },
]

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">What people say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testimonials.map((item, index) => (
                <Card key={index} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2">
                            <div>
                                <p className="text-lg">{item.name}</p>
                                <p className="text-zinc-400 text-sm">{item.title}</p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default LandingContent;
