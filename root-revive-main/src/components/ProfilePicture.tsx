
import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { supabase, initializeStorage, getAvailableBuckets } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface ProfilePictureProps {
  userId: string;
  url?: string;
  onImageUpdated?: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
}

const ProfilePicture = ({
  userId,
  url,
  onImageUpdated,
  size = 'md',
  editable = true,
}: ProfilePictureProps) => {
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [availableBuckets, setAvailableBuckets] = useState<string[]>([]);
  const { toast } = useToast();

  const avatarSize = {
    sm: 'h-14 w-14',
    md: 'h-20 w-20',
    lg: 'h-32 w-32',
  }[size];

  const getUserInitials = () => {
    // Default initials if no name is available
    return 'U';
  };

  // Check available buckets when component mounts
  useEffect(() => {
    const checkStorage = async () => {
      try {
        const buckets = await getAvailableBuckets();
        setAvailableBuckets(buckets.map(b => b.name));
        console.log('Available buckets for upload:', buckets.map(b => b.name));
      } catch (err) {
        console.error("Error checking storage:", err);
      }
    };

    checkStorage();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error state
    setUploadError(null);

    // Validate file type
    const fileExt = file.name.split('.').pop();
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    if (!allowedTypes.includes(fileExt?.toLowerCase() || '')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, or GIF).",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Get storage initialization info
      const { bucketName } = await initializeStorage();

      if (!bucketName) {
        throw new Error("No storage buckets available");
      }

      // Create a unique file path using userId and timestamp
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      // Store in avatars subfolder if not using avatars bucket
      const filePath = bucketName === 'avatars' ?
        fileName :
        `avatars/${fileName}`;

      console.log(`Uploading to bucket '${bucketName}' with path: ${filePath}`);

      // Upload to the available bucket
      const uploadResult = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadResult.error) {
        console.error(`Error uploading to ${bucketName} bucket:`, uploadResult.error);
        throw uploadResult.error;
      }

      console.log("Upload succeeded to path:", uploadResult.data?.path);

      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uploadResult.data?.path || filePath);

      const publicUrl = publicUrlData.publicUrl;
      console.log("Public URL:", publicUrl);

      // Update user metadata with new avatar URL
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      // Update profile record with new avatar URL
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (profileError) {
        console.error("Error updating profile:", profileError);
      }

      // Call the callback with the new URL
      if (onImageUpdated) {
        onImageUpdated(publicUrl);
      }

      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });

      // Close the upload options panel
      setShowUploadOptions(false);
    } catch (error: any) {
      console.error("Upload error:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error uploading your image. Please try again.";
      setUploadError(errorMessage);
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      // Update user metadata to remove avatar URL
      await supabase.auth.updateUser({
        data: { avatar_url: null }
      });

      // Update profile record to remove avatar URL
      await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', userId);

      // Call the callback with empty string
      if (onImageUpdated) {
        onImageUpdated('');
      }

      toast({
        title: "Profile picture removed",
        description: "Your profile picture has been removed.",
      });

      // Close the upload options panel
      setShowUploadOptions(false);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "There was an error removing your profile picture.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className={`${avatarSize} bg-brand-gold text-white`}>
          {url && <AvatarImage src={url} alt="Profile" />}
          <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>

        {editable && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-gray-100 border-gray-200"
            onClick={() => setShowUploadOptions(!showUploadOptions)}
          >
            <Camera size={16} />
          </Button>
        )}
      </div>

      {showUploadOptions && (
        <div className="mt-4 flex flex-col space-y-3 w-full">
          <div>
            <Label htmlFor="profile-image" className="cursor-pointer">
              <div className="flex items-center justify-center w-full p-2 border border-dashed rounded-md hover:bg-gray-50">
                <Upload size={16} className="mr-2" />
                <span>Upload new image</span>
              </div>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </Label>
            {availableBuckets.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                No storage buckets available. Contact administrator.
              </p>
            )}
          </div>

          {url && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-red-700 w-full flex items-center"
              onClick={handleRemoveImage}
            >
              <X size={16} className="mr-2" />
              Remove image
            </Button>
          )}
        </div>
      )}

      {isUploading && (
        <div className="mt-2 text-sm text-gray-500">Uploading...</div>
      )}

      {uploadError && (
        <div className="mt-2 text-sm text-red-500">{uploadError}</div>
      )}
    </div>
  );
};

export default ProfilePicture;
