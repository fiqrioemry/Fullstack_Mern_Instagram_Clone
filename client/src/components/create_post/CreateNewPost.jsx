import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { postControl, postState } from "@/config";
import { usePostStore } from "@/store/usePostStore";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useState, useCallback, useMemo } from "react";
import InputButton from "@/components/form/InputButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CreateNewPost() {
  const { createPost } = usePostStore();
  const formik = useFormSchema(postState, postControl, createPost);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isFormDirty = useMemo(() => formik.dirty, [formik.dirty]);

  const resetAndCloseDialog = useCallback(() => {
    formik.resetForm();
    setIsOpen(false);
  }, [formik]);

  const handleCancel = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleSave = useCallback(async () => {
    await formik.submitForm();
    if (formik.isValid) resetAndCloseDialog();
  }, [formik, resetAndCloseDialog]);

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
        <Button onClick={() => setIsOpen(true)}>
          <PlusSquare size={24} /> <span>Create</span>
        </Button>
        <DialogContent className="sm:max-w-[425px] p-0">
          <div className="text-center mt-4">
            <h4>Create New Post</h4>
          </div>
          <ScrollArea className="h-72 border">
            <div className="p-4">
              <InputForm
                formik={formik}
                formControl={postControl}
                inputStyle={"h-40 md:h-[4rem]"}
              >
                <div className="flex justify-end gap-2 p-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <InputButton
                    type="button"
                    formik={formik}
                    action={handleSave}
                    title="save changes"
                  />
                </div>
              </InputForm>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:w-[425px]">
          <div className="text-center mt-4">
            <h4>Unsaved Changes</h4>
            <p className="text-gray-600">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
          </div>
          <div className="flex justify-end gap-2 p-2">
            <Button
              variant="destructive"
              onClick={() => handleConfirmation(true)}
            >
              Yes, discard changes
            </Button>
            <Button variant="outline" onClick={() => handleConfirmation(false)}>
              No, keep changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
