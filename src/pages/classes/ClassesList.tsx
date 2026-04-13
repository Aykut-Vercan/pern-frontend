import { CreateButton } from "@/components/refine-ui/buttons/create"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ClassDetails, Subject, User } from "@/types";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { useList } from "@refinedev/core"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShowButton } from "@/components/refine-ui/buttons/show"

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { query: subjectQuery } = useList<Subject>({
    resource: "subjects",
    pagination: { pageSize: 100 }
  });
  const { query: teacherQuery } = useList<User>({
    resource: "users",
    filters: [{ field: "role", operator: "eq" as const, value: "teacher" }],
    pagination: { pageSize: 100 }
  });
  const subjects = subjectQuery?.data?.data || [];
  const teachers = teacherQuery?.data?.data || [];

  const searchFilters = searchQuery ?
    [{ field: 'name', operator: 'contains' as const, value: searchQuery }] : [];

  const subjectFilters = selectedSubject !== 'all' ?
    [{ field: 'subject', operator: 'eq' as const, value: selectedSubject }] : [];

  const teacherFilters = selectedTeacher !== 'all' ?
    [{ field: 'teacher', operator: 'eq' as const, value: selectedTeacher }] : [];

  const classColumn = useMemo<ColumnDef<ClassDetails>[]>(() => [
    {
      id: 'name',
      accessorKey: 'name',
      size: 100,
      header: () => <p className="column-title ml-2">Name</p>,
      cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
      filterFn: 'includesString'
    },
    {
      id: 'banner',
      accessorKey: 'bannerUrl',
      size: 60,
      header: () => <p className="column-title ml-2">Banner</p>,
      cell: ({ getValue }) => {
        const url = getValue<string>();
        return url ? (
          <img
            src={url}
            alt="banner"
            className="w-20 h-12 object-cover rounded cursor-pointer"
            onClick={() => setPreviewUrl(url)}
          />
        ) : (
          <span className="text-muted-foreground text-xs">No image</span>
        );
      }
    },
    {
      id: 'teacher',
      accessorKey: 'teacher.name',
      size: 100,
      header: () => <p className="column-title ml-2">Teacher</p>,
      cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
      filterFn: 'includesString'
    },
    {
      id: 'subject',
      accessorKey: 'subject.name',
      size: 120,
      header: () => <p className="column-title ml-2">Subject</p>,
      cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
      filterFn: 'includesString'
    },
    {
      id: 'department',
      accessorKey: 'department.name',
      size: 150,
      header: () => <p className="column-title ml-2">Department</p>,
      cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
      filterFn: 'includesString'
    },
    {
      id: 'capacity',
      accessorKey: 'capacity',
      size: 40,
      header: () => <p className="column-title">Capacity</p>,
      cell: ({ getValue }) => <span className="text-foreground">{getValue<number>()}</span>,
      filterFn: 'includesString'
    },
    {
      id: 'status',
      accessorKey: 'status',
      size: 80,
      header: () => <p className="column-title ml-4">Status</p>,
      cell: ({ getValue }) => {
        const status = getValue<string>();
        return (
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status.toUpperCase()}
          </Badge>
        );
      },
      filterFn: 'includesString'
    },
    {
      id: 'inviteCode',
      accessorKey: 'inviteCode',
      size: 100,
      header: () => <p className="column-title ml-2">Invite Code</p>,
      cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
      filterFn: 'includesString'
    },
    {
      id: 'description',
      accessorKey: 'description',
      size: 100,
      header: () => <p className="column-title ml-2">Description</p>,
      cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
      filterFn: 'includesString'
    },
    {
      id: 'details',
      size: 100,
      header: () => <p className="column-title ml-2">Details</p>,
      cell: ({ row }) => <ShowButton resource="classes" recordItemId={row.original.id} size="sm" variant="outline">
        View
        </ShowButton>
    }
  ], [])

  const classTable = useTable<ClassDetails>({
    columns: classColumn,
    refineCoreProps: {
      resource: 'classes',
      pagination: { pageSize: 10, mode: 'server' },
      filters: {
        permanent: [...searchFilters, ...subjectFilters, ...teacherFilters]
      },
      sorters: {
        initial: [
          { field: 'id', order: 'desc' }
        ]
      }
    }
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Classes</h1>
      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>
        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="search by name"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by teacher" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>
      <DataTable table={classTable} />

      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {previewUrl && (
            <img src={previewUrl} alt="banner preview" className="w-full h-auto object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </ListView>
  )
}

export default ClassesList
