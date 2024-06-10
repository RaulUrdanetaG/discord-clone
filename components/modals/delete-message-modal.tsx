"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserAvatar from "../user-avatar";
import Image from "next/image";
import { FileIcon } from "lucide-react";

export default function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.delete(url);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-[#313338] p-0 overflow-hidden">
        <DialogHeader className="text-black dark:text-white pt-8 px-6">
          <DialogTitle className="text-2xl text-start font-semibold mb-2">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure you want to delete this message?
            <div className="group flex gap-x-2 items-start w-full border-[1px] border-[#E8E9EB] dark:border-[#242629] rounded-md p-2 shadow-inner mt-2">
              <div className="cursor-pointer hover:drop-shadow-md transition">
                <UserAvatar src={data.message?.imageUrl} />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center">
                    <p className="font-semibold text-sm hover:underline cursor-pointer">
                      {data.message?.name}
                    </p>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {data.message?.timestamp}
                  </span>
                </div>
                {data.message?.isImage && (
                  <a
                    href={data.message?.fileUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                  >
                    <Image
                      src={data.message?.fileUrl!}
                      alt={data.message?.content}
                      fill
                      className="object-cover"
                    />
                  </a>
                )}
                {data.message?.isPdf && (
                  <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                    <a
                      href={data.message?.fileUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                      PDF FIle
                    </a>
                  </div>
                )}
                {!data.message?.isPdf && !data.message?.isImage && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {data.message?.content}
                  </p>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31] px-6 py-4">
          <Button
            disabled={isLoading}
            variant={"link"}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant={"destructive"}
            onClick={onClick}
          >
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
