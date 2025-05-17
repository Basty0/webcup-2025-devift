import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Facebook, Link2, Linkedin, MessageSquare, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    slug: string;
}

export default function ShareModal({ open, onOpenChange, slug }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const shareUrl = `${window.location.origin}/theend/${slug}`;
    const shareText = 'Découvrez cette histoire sur TheEnd !';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success('Lien copié !');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Erreur lors de la copie du lien');
        }
    };

    const shareToSocial = (platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'sms') => {
        const text = encodeURIComponent(shareText);
        const url = encodeURIComponent(shareUrl);

        let socialShareUrl = '';
        switch (platform) {
            case 'twitter':
                socialShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                break;
            case 'facebook':
                socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                socialShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                socialShareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'sms':
                socialShareUrl = `sms:?body=${text}%20${url}`;
                break;
        }

        if (platform === 'sms') {
            window.location.href = socialShareUrl;
        } else {
            window.open(socialShareUrl, '_blank', 'width=600,height=400');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Partager</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-6 py-4">
                    {/* QR Code */}
                    <div className="rounded-xl bg-white p-4">
                        <QRCodeSVG value={shareUrl} size={200} />
                    </div>

                    {/* Lien copiable */}
                    <div className="flex w-full items-center space-x-2">
                        <Input value={shareUrl} readOnly className="flex-1" />
                        <Button
                            variant={copied ? 'secondary' : 'default'}
                            size="icon"
                            onClick={handleCopyLink}
                            className="shrink-0 transition-colors duration-200"
                        >
                            <Link2 className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Boutons de partage */}
                    <div className="grid grid-cols-5 gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => shareToSocial('twitter')}
                            className="border-none bg-gradient-to-br from-[#1DA1F2] to-[#19608F] transition-all duration-200 hover:from-[#19608F] hover:to-[#1DA1F2]"
                        >
                            <X className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => shareToSocial('facebook')}
                            className="border-none bg-gradient-to-br from-[#1877F2] to-[#0C5DCF] transition-all duration-200 hover:from-[#0C5DCF] hover:to-[#1877F2]"
                        >
                            <Facebook className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => shareToSocial('linkedin')}
                            className="border-none bg-gradient-to-br from-[#0A66C2] to-[#054785] transition-all duration-200 hover:from-[#054785] hover:to-[#0A66C2]"
                        >
                            <Linkedin className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => shareToSocial('whatsapp')}
                            className="border-none bg-gradient-to-br from-[#25D366] to-[#128C7E] transition-all duration-200 hover:from-[#128C7E] hover:to-[#25D366]"
                        >
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => shareToSocial('sms')}
                            className="border-none bg-gradient-to-br from-[#6B7280] to-[#374151] transition-all duration-200 hover:from-[#374151] hover:to-[#6B7280]"
                        >
                            <MessageSquare className="h-5 w-5 text-white" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
