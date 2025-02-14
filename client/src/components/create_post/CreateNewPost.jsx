import Galleries from "../post/Galleries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postControl, postState } from "@/config";
import { Textarea } from "@/components/ui/textarea";
import { usePostStore } from "@/store/usePostStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState, useCallback, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, PlusSquare } from "lucide-react";

export function CreateNewPost() {
  const [step, setStep] = useState(1);
  const { createPost } = usePostStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formPost = useFormSchema(postState, postControl, createPost);
  const { multiFile } = useFileUpload(formPost.setFieldValue, formPost.values);

  const isFormDirty = useMemo(() => formPost.dirty, [formPost.dirty]);

  const resetAndCloseDialog = useCallback(() => {
    formPost.resetForm();
    setIsOpen(false);
  }, [formPost]);

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
        <Button variant="follow" onClick={() => setIsOpen(true)}>
          <PlusSquare /> <span className="hidden md:block">Create</span>
        </Button>
        <DialogContent>
          {formPost.values.images.length === 0 && (
            <div className="flex justify-center py-2 border-b">
              <h3>Create New Post</h3>
            </div>
          )}

          {step === 1 && formPost.values.images.length > 0 && (
            <div className="flex justify-between py-2 border-b">
              <ArrowLeft onClick={handleCancel} />
              <h3>Edit</h3>
              <ArrowRight onClick={() => setStep(2)} />
            </div>
          )}

          {step === 2 && formPost.values.images.length > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <ArrowLeft onClick={() => setStep(1)} />
              <h3>Create New Post</h3>
              <Button onClick={handleSave}>Share</Button>
            </div>
          )}

          {formPost.values.images.length === 0 && (
            <div className="h-[17rem] w-[20rem] relative">
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
                  <label
                    htmlFor="images"
                    className="py-2 px-2 border bg-blue-500 text-white rounded-md"
                  >
                    Select from computer
                  </label>
                </div>
              </label>
            </div>
          )}

          {step === 1 && formPost.values.images.length > 0 && (
            <div className="h-[17rem] w-[24rem]">
              <Galleries images={formPost.values.images} />
            </div>
          )}

          {step === 2 && formPost.values.images.length > 0 && (
            <div className="w-full block md:flex h-auto md:h-[20rem] overflow-y-scroll">
              <div className="w-full md:w-1/2">
                <Galleries images={formPost.values.images} />
              </div>
              <div className="h-[20rem] w-full md:w-1/2 mb-2">
                <Textarea placeholder="Write a caption..." />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:w-[400px] p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold">Discard post?</h4>
            <p className="text-gray-600 mt-2 text-sm">
              If you leave, your edits won&apos;t be saved.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="destructive"
              className="w-full text-red-600 font-semibold"
              onClick={() => handleConfirmation(true)}
            >
              Discard
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleConfirmation(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
{
  /* <Button
type="button"
variant="destructive"
onClick={handleCancel}
>
Cancel
</Button>
<InputButton
type="button"
formPost={formPost}
action={handleSave}
title="save changes"
/> */
}
