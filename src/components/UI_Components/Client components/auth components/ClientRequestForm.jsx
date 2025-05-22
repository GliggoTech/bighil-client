"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdEmail } from "react-icons/md";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  numberOfEmployees: z
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be a positive number"),
  companyEmail: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  bestContactDate: z.date({ required_error: "Date is required" }),
  bestContactTime: z.string().min(1, "Please select a time"),
});

const timeSlots = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",

  "Anytime",
];

export default function ClientRequestForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      numberOfEmployees: 1,
      companyEmail: "",
      subject: "",
      message: "",
      bestContactDate: undefined,
      bestContactTime: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="space-y-8 p-8 bg-default_bg rounded-2xl shadow-lg border border-dialog_inside_border_color">
      <h2 className="lg:text-3xl text-xl font-bold text-text_color mb-4 border-b-2 border-primary pb-3">
        Request Access
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Company Name <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company name"
                    {...field}
                    className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors duration-200 py-3 px-4 text-text_color placeholder-text_color/50"
                  />
                </FormControl>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Number of Employees */}
          <FormField
            control={form.control}
            name="numberOfEmployees"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Number of Employees <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter number of employees"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors duration-200 py-3 px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Company Email */}
          <FormField
            control={form.control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Company Email <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter company email"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors duration-200 py-3 px-4 pr-10 text-text_color placeholder-text_color/50"
                    />
                    <MdEmail className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </FormControl>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Subject <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter subject"
                    {...field}
                    className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors duration-200 py-3 px-4 text-text_color placeholder-text_color/50"
                  />
                </FormControl>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Contact Message <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Enter message"
                    {...field}
                    className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors duration-200 py-3 px-4 text-text_color placeholder-text_color/50"
                  />
                </FormControl>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Contact Date */}
          <FormField
            control={form.control}
            name="bestContactDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-text_color font-medium">
                  Best Date to Contact <span className="text-red">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-lg border-gray-300 hover:border-primary hover:bg-gray-100 py-3 px-4",
                          !field.value && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-xl shadow-xl">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="rounded-xl"
                      classNames={{
                        day_selected:
                          "bg-primary text-white hover:bg-primary/90",
                        day_today: "border border-primary text-primary",
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Contact Time */}
          <FormField
            control={form.control}
            name="bestContactTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Best Time to Contact <span className="text-red">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 py-3 px-4 text-text_color">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    {timeSlots.map((time) => (
                      <SelectItem
                        key={time}
                        value={time}
                        className="hover:bg-primary-bg-subtle focus:bg-primary-bg-subtle text-text_color"
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Submit Request
          </Button>
        </form>
      </Form>
    </div>
  );
}
