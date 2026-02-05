import CodeBlock from "@/components/code/CodeBlock"
import { getLanguageFromFileName } from "@/lib/getLanguage"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


function CodeTextView({ code, selectedFile }) {
    if (!code) {
        return (
            <div className="flex items-center justify-center h-screen">
                Select a file to view code
            </div>
        )
    }

    const breadCrumb = () => {
        const selectedFileElement = selectedFile.split("/");
        const isLast = selectedFileElement.length - 1
        return (
            <div className="p-2 flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList className={"text-md"}>
                        {selectedFileElement.map((eachItem, i) => {
                            return (<BreadcrumbItem key={i}>
                                {
                                    i == isLast ? (
                                        <BreadcrumbPage>{eachItem}</BreadcrumbPage>
                                    ) : (
                                        <>
                                            {eachItem}
                                            <BreadcrumbSeparator />
                                        </>
                                    )
                                }

                            </BreadcrumbItem>)

                        })
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        )
    }

    return (


        <div className="flex flex-col h-full w-full bg-dark">
            {breadCrumb()}
            <CodeBlock
                code={code}
                lang={getLanguageFromFileName(selectedFile)}
            />
        </div>

    )
}

export default CodeTextView
