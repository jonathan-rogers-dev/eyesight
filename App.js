import { StatusBar } from "expo-status-bar";
import { ScreenStack } from "./navigation";

export default function App() {
  return (
    <>
    <StatusBar style="dark"/>
    <ScreenStack/>
    </>
  );
}