import Galleries from "../post/Galleries";
import Avatar from "@/components/ui/Avatar";
import { Input } from "@/components/ui/input";
import ConfirmationBox from "./ConfirmationBox";
import { postControl, postState } from "@/config";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Textarea } from "@/components/ui/textarea";
import { usePostStore } from "@/store/usePostStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState, useCallback, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CreateNewPost({ isOpen, setIsOpen }) {
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const { createPost } = usePostStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formPost = useFormSchema(postState, postControl, createPost);
  const isFormDirty = useMemo(() => formPost.dirty, [formPost.dirty]);
  const { multiFile } = useFileUpload(formPost.setFieldValue, formPost.values);

  const resetAndCloseDialog = useCallback(() => {
    formPost.resetForm();
    setIsOpen(false);
  }, [formPost, setIsOpen]);

  const handleCancel = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleSave = useCallback(async () => {
    await formPost.submitForm();
    if (formPost.isValid) resetAndCloseDialog();
  }, [formPost, resetAndCloseDialog]);

  const handleCloseDialog = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleConfirmation = useCallback(
    (confirmed) => {
      if (confirmed) resetAndCloseDialog();
      setShowConfirmation(false);
    },
    [resetAndCloseDialog]
  );

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (!open ? handleCloseDialog() : setIsOpen(open))}
      >
        <DialogContent className="max-w-2xl p-0 border-none bg-secondary">
          {formPost.values.images.length === 0 && (
            <div className="flex-center py-2 border-b border-muted-foreground/50">
              <h3>Create New Post</h3>
            </div>
          )}

          {step === 1 && formPost.values.images.length > 0 && (
            <div className="flex-between py-2 border-b border-muted-foreground/50">
              <ArrowLeft onClick={handleCancel} />
              <h3>Edit</h3>
              <ArrowRight onClick={() => setStep(2)} />
            </div>
          )}

          {step === 2 && formPost.values.images.length > 0 && (
            <div className="flex-between py-2 border-b border-muted-foreground/50">
              <ArrowLeft onClick={() => setStep(1)} />
              <h3>Create New Post</h3>
              <button className="btn-accent" onClick={handleSave}>
                Share
              </button>
            </div>
          )}

          {formPost.values.images.length === 0 && (
            <div className="h-72 relative">
              <Input
                multiple
                type="file"
                id="images"
                name="images"
                accept="image/*"
                onChange={multiFile}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="absolute h-full w-full flex items-center justify-center"
              >
                <div className="text-center space-y-2">
                  <div className="mb-4">Drag photos and videos here</div>
                  <button className="btn btn-accent">
                    Select from computer
                  </button>
                </div>
              </label>
            </div>
          )}

          {step === 1 && formPost.values.images.length > 0 && (
            <div className="flex items-center">
              <Galleries images={formPost.values.images} />
            </div>
          )}

          {step === 2 && formPost.values.images.length > 0 && (
            <div className="md:flex block">
              <div className="h-72 items-center flex bg-muted-foreground w-full md:w-1/2">
                <Galleries images={formPost.values.images} />
              </div>
              <div className="w-full md:w-1/2 mb-2">
                <Avatar avatar={user.avatar} />
                {/* Menghubungkan Textarea dengan form state */}
                <Textarea
                  placeholder="Write a caption..."
                  value={formPost.values.caption || ""}
                  onChange={(e) =>
                    formPost.setFieldValue("caption", e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationBox
        open={showConfirmation}
        cancelLabel="Cancel"
        title="Discard post?"
        confirmLabel="Discard"
        confirmVariant="delete"
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirmation(true)}
        message="If you leave, your edits won't be saved."
      />
    </>
  );
}
