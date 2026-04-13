import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { BookOpen, Building2, ClipboardCheck, GraduationCap, Home, Users } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/subjects/SubjectList";
import SubjectsCreate from "./pages/subjects/SubjectsCreate";
import Dashboard from "@/pages/Dashboard";

import { dataProvider } from "./providers/data";
import ClassesList from "@/pages/classes/ClassesList";
import ClassesCreate from "@/pages/classes/ClassesCreate";
import ClassesShow from "./pages/classes/ClassesShow";
import { Login } from "./pages/login";
import DepartmentsList from "./pages/departments/DepartmentsList";
import DepartmentsCreate from "./pages/departments/DepartmentsCreate";
import DepartmentsShow from "./pages/departments/DepartmentsShow";
import { Register } from "./pages/register";
import { authProvider } from "./providers/auth";
import SubjectsShow from "./pages/subjects/SubjectsShow";
import FacultyList from "./pages/faculty/FacultyList";
import FacultyShow from "./pages/faculty/FacultyShow";
import EnrollmentsCreate from "./pages/enrollments/EnrollmentsCreate";
import EnrollmentsJoin from "./pages/enrollments/EnrollmentsJoin";
import EnrollmentConfirm from "./pages/enrollments/EnrollmentsConfirm";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "Zw9MEM-9jYcPt-3Bhaq5",
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: { label: 'Home', icon: <Home /> }
                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  show: "/subjects/show/:id",
                  create: '/subjects/create',
                  meta: { label: 'Subjects', icon: <BookOpen /> }
                },
                {
                  name: "departments",
                  list: "/departments",
                  show: "/departments/show/:id",
                  create: "/departments/create",
                  meta: {
                    label: "Departments",
                    icon: <Building2 />,
                  },
                },
                {
                  name: "users",
                  list: "/faculty",
                  show: "/faculty/show/:id",
                  meta: {
                    label: "Faculty",
                    icon: <Users />,
                  },
                },
                {
                  name: "enrollments",
                  list: "/enrollments/create",
                  create: "/enrollments/create",
                  meta: {
                    label: "Enrollments",
                    icon: <ClipboardCheck />,
                  },
                },
                {
                  name: 'classes',
                  list: '/classes',
                  show: '/classes/show/:id',
                  create: '/classes/create',
                  meta: { label: 'Classes', icon: <GraduationCap /> }
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated key="public-routes" fallback={<Outlet />}>
                      <NavigateToResource fallbackTo="/" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="private-routes" fallback={<Login />}>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >

                  <Route path='/' element={<Dashboard />} />

                  <Route path='subjects' >
                    <Route index element={<SubjectList />} />
                    <Route path="show/:id" element={<SubjectsShow />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>

                  <Route path="departments">
                    <Route index element={<DepartmentsList />} />
                    <Route path="create" element={<DepartmentsCreate />} />
                    <Route path="show/:id" element={<DepartmentsShow />} />
                  </Route>

                  <Route path="faculty">
                    <Route index element={<FacultyList />} />
                    <Route path="show/:id" element={<FacultyShow />} />
                  </Route>

                  <Route path="enrollments">
                    <Route path="create" element={<EnrollmentsCreate />} />
                    <Route path="join" element={<EnrollmentsJoin />} />
                    <Route path="confirm" element={<EnrollmentConfirm />} />
                  </Route>

                  <Route path='classes' >
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
