import StudentDetailScreen from "@/components/StudentDetailScreen";
import { useSearchParams } from "expo-router/build/hooks";

export default function Id() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id")!!;

  return <StudentDetailScreen studentId={studentId} />;
}
