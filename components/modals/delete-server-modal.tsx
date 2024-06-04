"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteServerModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
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
            Delete {`'${server?.name}'`}
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure you want to delete <strong>{server?.name}</strong> ?
            This action cannot be undone.
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
            Delete Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
