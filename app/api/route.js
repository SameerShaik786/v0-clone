import { db } from "@/lib/db"
import { getCurrentUser } from "@/modules/auth/actions"
import { NextResponse } from "next/server"


export async function GET() {
const user = await getCurrentUser()
if (!user) return NextResponse.json([], { status: 401 })


const projects = await db.project.findMany({
where: { userId: user.id },
orderBy: { createdAt: "desc" }
})


return NextResponse.json(projects)
}

