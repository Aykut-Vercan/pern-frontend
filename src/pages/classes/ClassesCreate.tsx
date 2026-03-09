import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBack } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { classSchema } from "@/lib/schema";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import UploadWidget from "@/components/UploadWidget";
import { UploadWidgetValue } from "@/types";
import { ControllerRenderProps } from "react-hook-form";

const ClassesCreate = () => {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      resource: "classes",
      action: "create",
    }
  });

  const { handleSubmit, formState: { isSubmitting, errors }, control } = form;

  const onSubmit = async (values: z.infer<typeof classSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log("Error creating new classes", error);
    }
  };

  const teachers = [
    {
      id: "1",
      name: "John Doe",
    },
    {
      id: "2",
      name: "Jane Smith",
    },
    {
      id: "3",
      name: "Dr. Alan Turing",
    },
  ];

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH",
    },
    {
      id: 2,
      name: "Computer Science",
      code: "CS",
    },
    {
      id: 3,
      name: "Physics",
      code: "PHY",
    },
    {
      id: 4,
      name: "Chemistry",
      code: "CHEM",
    },
  ];


  const bannerPublicId = form.watch('bannerCldPubId');

  const setBannerImage = (
    file: UploadWidgetValue | null,
    field: ControllerRenderProps<z.infer<typeof classSchema>, "bannerUrl">//bu field classShcemadaki bannerUrl
  ) => {
    if (file) {
      field.onChange(file.url);
      form.setValue('bannerCldPubId', file.publicId, { shouldValidate: true, shouldDirty: true })
    } else {
      field.onChange('');
      form.setValue('bannerCldPubId', '', { shouldValidate: true, shouldDirty: true })
    }
  }


  return (
    <CreateView className="class-view">
      <Breadcrumb />
      <h1 className="page-title">Create a class</h1>
      <div className="intro-row">
        <p>Provide the required information below to add a class</p>
        <Button onClick={back}>Go back</Button>
      </div>
      <Separator />
      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold">
              Fill out the form
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-8">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                  control={control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image <span className="text-orange-600">*</span> </FormLabel>
                      <FormControl>
                        <UploadWidget value={
                          field.value ?
                            {
                              url: field.value,
                              publicId: bannerPublicId ?? ''
                            } : null}
                          onChange={(file) => setBannerImage(file, field)}
                        />
                      </FormControl>
                      <FormMessage />
                      {errors.bannerCldPubId && !errors.bannerUrl && (<p className="text-destructive text-sm">{errors.bannerCldPubId.message?.toString()}</p>)}
                    </FormItem>
                  )}
                />

                < FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name<span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Data structures"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject<span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field?.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem
                                value={subject.id.toString()}
                                key={subject.id}
                              >
                                {subject.name}({subject.code})
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
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher<span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field?.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a teacher" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem
                                value={teacher.id.toString()}
                                key={teacher.id}
                              >
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="30"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? null : Number(value));
                            }}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                          <FormMessage />
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description about class" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <Button type="submit" size="lg" className="w-full">
                  {isSubmitting ? (
                    <div className="flex gap-1">
                      <span>Creating Class...</span>
                      <Loader2 className="inline-block ml-2 animate-spin" />
                    </div>
                  ) : (
                    "Create Class"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default ClassesCreate;
