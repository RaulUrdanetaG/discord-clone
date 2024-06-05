"use client";

import qs from "query-string";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Hash, Volume2 } from "lucide-react";
import { useEffect } from "react";
import { channel } from "diagnostics_channel";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Channel name is required." })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export default function EditChannelModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editChannel";
  const { channel, server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", type: channel?.type || ChannelType.TEXT },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.patch(url, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel.name);
      form.setValue("type", channel.type);
    }
  }, [channel, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#313338] p-0 overflow-hidden">
        <DialogHeader className="text-black dark:text-white pt-8 px-6">
          <DialogTitle className="text-2xl text-start font-medium">
            Overview
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-[#DBDEE1]">
                      Channel Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="flex flex-col gap-2"
                      >
                        <FormItem
                          className="flex-1 flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
                          h-[60px] bg-[#EAEBED] dark:bg-[#43444B] hover:bg-[#E1E2E4] dark:hover:bg-[#393C41] "
                        >
                          <FormLabel className="flex-1 flex items-center justify-between gap-3 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Hash className="text-[#5E5E60] dark:text-[#7E8287] h-8 w-8" />
                              <div>
                                <p className="text-[#313338] dark:text-[#DBDEE1] text-lg">
                                  Text
                                </p>
                                <p className="text-[#676970] dark:text-[#B5BAC1] text-xs">
                                  Send messages, images, GIFs, emoji, opinions,
                                  and puns
                                </p>
                              </div>
                            </div>
                            <FormControl>
                              <RadioGroupItem value="TEXT" />
                            </FormControl>
                          </FormLabel>
                        </FormItem>
                        <FormItem
                          className="flex-1 flex items-center  px-4 py-2 rounded-md 
                           h-[60px] bg-[#EAEBED] dark:bg-[#43444B] hover:bg-[#E1E2E4] dark:hover:bg-[#393C41] "
                        >
                          <FormLabel className="flex-1 flex items-center justify-between gap-3 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Volume2 className="text-[#5E5E60] dark:text-[#7E8287] h-8 w-8" />
                              <div>
                                <p className="text-[#313338] dark:text-[#DBDEE1] text-lg">
                                  Voice
                                </p>
                                <p className="text-[#676970] dark:text-[#B5BAC1] text-xs">
                                  Hang out together with voice, video, and
                                  screen share
                                </p>
                              </div>
                            </div>
                            <FormControl>
                              <RadioGroupItem value="AUDIO" />
                            </FormControl>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-[#DBDEE1]">
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:bg-[#1E1F22] border-0 focus-visible:ring-0 
                        text-black dark:text-[#C6C8CB] focus-visible:ring-offset-0 font-medium"
                        placeholder="# new-channel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31] px-6 py-4">
              <Button
                disabled={isLoading}
                variant={"link"}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} variant={"creative"} type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
