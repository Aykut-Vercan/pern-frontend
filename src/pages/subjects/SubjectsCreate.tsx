import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useBack, useList, type BaseRecord, type HttpError } from "@refinedev/core";
import * as z from "zod";

import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Department = { id: number; name: string; code?: string | null };

const subjectSchema = z.object({
    code: z.string().min(2, "Subject code must be at least 2 characters"),
    name: z.string().min(3, "Subject name must be at least 3 characters"),
    departmentId: z.coerce.number().min(1, "Department is required"),
    description: z.string().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

const SubjectsCreate = () => {
    const back = useBack();

    const { query: departmentsQuery } = useList<Department>({
        resource: "departments",
        pagination: { pageSize: 100 },
    });
    const departments = departmentsQuery.data?.data ?? [];

    const form = useForm<BaseRecord, HttpError, SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
        refineCoreProps: {
            resource: "subjects",
            action: "create",
        },
        defaultValues: {
            code: "",
            name: "",
            departmentId: 0,
            description: "",
        },
    });

    const {
        refineCore: { onFinish },
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = form;

    const onSubmit = async (values: SubjectFormValues) => {
        try {
            await onFinish(values);
        } catch (error) {
            console.error("Error creating subject:", error);
        }
    };

    return (
        <CreateView className="class-view">
            <Breadcrumb />

            <h1 className="page-title">Create a Subject</h1>
            <div className="intro-row">
                <p>Provide the required information below to add a subject.</p>
                <Button onClick={() => back()}>Go Back</Button>
            </div>

            <Separator />

            <div className="my-4 flex items-center">
                <Card className="class-form-card">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
                            Fill out form
                        </CardTitle>
                    </CardHeader>

                    <Separator />

                    <CardContent className="mt-7">
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={control}
                                    name="departmentId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Department <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={(val) => field.onChange(Number(val))}
                                                value={field.value ? String(field.value) : ""}
                                                disabled={departmentsQuery.isLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map((dept) => (
                                                        <SelectItem key={dept.id} value={String(dept.id)}>
                                                            {dept.name}
                                                            {dept.code ? ` (${dept.code})` : ""}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Subject Code <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="MATH101" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Subject Name <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Introduction to Mathematics" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the subject..."
                                                    className="min-h-28"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating..." : "Create Subject"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </CreateView>
    );
};

export default SubjectsCreate;