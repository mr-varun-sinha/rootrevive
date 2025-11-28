
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Upload, Camera, RefreshCw, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

// This mock data will be replaced with real data from ML model
const mockAnalysisResults = {
  conditions: [
    { name: "Dry Scalp", probability: 0.87, description: "Your scalp shows signs of dryness, which can lead to flakiness and itchiness." },
    { name: "Hair Thinning", probability: 0.65, description: "Moderate hair thinning detected in the crown area." },
    { name: "Split Ends", probability: 0.43, description: "Some split ends detected, indicating potential hair damage." }
  ],
  recommendations: []
};

const Analysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleCaptureImage = () => {
    setIsCameraOpen(true);
    
    // Request camera access when dialog opens
    setTimeout(() => {
      if (videoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            console.error("Error accessing camera:", err);
            toast({
              title: "Camera Error",
              description: "Unable to access your camera. Please check permissions.",
              variant: "destructive",
            });
            setIsCameraOpen(false);
          });
      }
    }, 100);
  };
  
  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/png');
        setImage(imageDataUrl);
        
        // Stop all video streams when photo is taken
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
        
        toast({
          title: "Image Captured",
          description: "Your photo has been captured successfully.",
        });
      }
    }
  };
  
  const closeCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsCameraOpen(false);
  };
  
  const handleAnalyzeImage = () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload or capture an image first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // This is where the ML model API would be called in a real implementation
    setTimeout(() => {
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Sent",
        description: "Your image has been sent for analysis. Results will be displayed shortly.",
      });
      
      // In a real implementation, the ML model would handle displaying results
    }, 2000);
  };
  
  const resetAnalysis = () => {
    setImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-brand-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-medium mb-4">Hair & Scalp Analysis</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload a photo of your hair or scalp and our advanced technology will analyze it to provide 
            personalized insights and product recommendations.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="section-title">Step 1: Upload or Capture an Image</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {image ? (
                <div className="space-y-4">
                  <div className="relative aspect-video max-h-96 overflow-hidden rounded-md">
                    <img 
                      src={image} 
                      alt="Uploaded hair/scalp" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={resetAnalysis}>
                      Change Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium">Upload an image</p>
                        <p className="text-gray-500 text-sm mt-1">
                          Drag and drop an image, or click to browse
                        </p>
                      </div>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button
                        onClick={() => document.getElementById('image-upload')?.click()}
                        variant="outline"
                        className="mx-auto"
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">- or -</p>
                    <Button onClick={handleCaptureImage}>
                      <Camera className="mr-2" size={18} />
                      Capture with Camera
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="section-title">Step 2: Analyze Your Image</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-6 text-gray-700">
                Our advanced ML model will examine your hair and scalp for common conditions and provide personalized recommendations.
              </p>
              
              <Button
                disabled={!image || isAnalyzing}
                onClick={handleAnalyzeImage}
                className="bg-brand-gold text-brand-dark hover:bg-opacity-90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>
          </div>
          
          <div>
            <h2 className="section-title">About Our Technology</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-medium mb-4">How It Works</h3>
                  <p className="text-gray-700 mb-4">
                    Our advanced analysis technology uses machine learning trained on thousands of hair and scalp images 
                    to identify common conditions and recommend the most effective products.
                  </p>
                  <p className="text-gray-700">
                    The analysis takes into account factors like scalp condition, hair texture, 
                    and visible issues to provide personalized recommendations.
                  </p>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Analysis Technology" 
                    className="rounded-md w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Privacy First",
                    description: "Your images are analyzed securely and not stored without your permission."
                  },
                  {
                    title: "Continuous Learning",
                    description: "Our analysis model improves over time with more data and feedback."
                  },
                  {
                    title: "Expert Backed",
                    description: "Developed in collaboration with professional trichologists."
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-md">
                    <h4 className="font-medium mb-2">{item.title}</h4>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isCameraOpen} onOpenChange={(open) => {
        if (!open) closeCamera();
        setIsCameraOpen(open);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take a Photo</DialogTitle>
            <DialogDescription>
              Position your hair or scalp in the camera frame and click the capture button.
            </DialogDescription>
          </DialogHeader>
          <div className="relative mt-2 overflow-hidden rounded-md aspect-video bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button onClick={takeSnapshot} className="bg-brand-gold text-brand-dark hover:bg-opacity-90">
              Capture Photo
            </Button>
            <DialogClose asChild>
              <Button variant="outline" onClick={closeCamera}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Analysis;
