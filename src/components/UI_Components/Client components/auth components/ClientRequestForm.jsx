"use client";

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
import { CalendarIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { clientRequestFormSchema, timeSlots } from "@/utils/clientRequestUtil";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { toast } from "@/hooks/use-toast";
import ClientRequestFormSuccessPopUp from "./ClientRequestFormSuccessPopUp";

export default function ClientRequestForm() {
  const form = useForm({
    resolver: zodResolver(clientRequestFormSchema),
    defaultValues: {
      companyName: "",
      numberOfEmployees: 1,
      companyEmail: "",
      // subject: "",
      message: "",
      // bestContactDate: undefined,
      // bestContactTime: "",
    },
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { fetchData, loading, succes, error } = useFetch();
  const [showPopUp, setShowpopUp] = useState(false);

  const onSubmit = async (values) => {
    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/client-request-access`,
      "POST",
      values,
      null,
      false
    );

    if (res.success) {
      toast({
        title: "Request Submitted",
        variant: "success",
        description: "Your request has been submitted successfully.",
      });
      setShowpopUp(true);
    } else {
      toast({
        title: "Request Failed",
        variant: "destructive",
        description: res.message,
      });
    }
  };
  const closepopUp = () => {
    // Use form.reset with default values
    form.reset({
      companyName: "",
      numberOfEmployees: 1,
      companyEmail: "",
      // subject: "",
      message: "",
      // bestContactDate: undefined,
      // bestContactTime: "",
    });
    setShowpopUp(false);
  };

  return (
    <div className="space-y-4 p-5 bg-default_bg rounded-2xl shadow-lg border border-dialog_inside_border_color">
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
                    {/* Icon */}
                    <MdEmail className="h-5 w-5 text-primary absolute left-3 top-1/2 -translate-y-1/2" />

                    {/* Input */}
                    <Input
                      type="email"
                      placeholder="Enter company email"
                      {...field}
                      className="pl-10 pr-4 py-3 rounded-lg border-gray-300 text-text_color placeholder-text_color/50 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors duration-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          />

          {/*        
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
          /> */}

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Send us a message 
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
          {/* 
          <FormField
            control={form.control}
            name="bestContactDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-text_color font-medium">
                  Best Date to Contact <span className="text-red">*</span>
                </FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          
                 
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-lg border-gray-300 hover:border-primary hover:bg-gray-100 py-3 px-4",
                          !field.value && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className=" p-0 bg-white border border-gray-200 rounded-xl shadow-xl"
                    side="bottom"
                    align="start"
                    sideOffset={5}
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="rounded-xl w-fit"
                      classNames={{
                        day_selected:
                          "bg-primary text-white hover:bg-primary/90",
                        day_today: "border border-primary text-primary",
                        nav_button:
                          "text-gray-600 hover:text-primary inline-flex",
                        nav: "flex items-center justify-between  py-2 block",
                        caption: "text-sm font-medium text-center",
                        nav_button_previous:
                          "absolute left-4 bg-primary p-1 rounded-full text-white hover:text-white ",
                        nav_button_next:
                          "absolute right-4 bg-primary p-1 rounded-full text-white hover:text-white",
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-danger text-sm mt-1" />
              </FormItem>
            )}
          /> */}
          {/* Contact Time */}
          {/* <FormField
            control={form.control}
            name="bestContactTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text_color font-medium">
                  Best Time to Contact <span className="text-red">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
          /> */}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            {loading ? (
              <Loader className="animate-spin h-4 w-4" />
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </Form>
      <ClientRequestFormSuccessPopUp
        showPopUp={showPopUp}
        onClose={closepopUp}
      />
    </div>
  );
}
