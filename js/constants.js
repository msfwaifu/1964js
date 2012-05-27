/*
1964js - JavaScript/HTML5 port of 1964 - N64 emulator
Copyright (C) 2012 Joel Middendorf

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

//mem map
var MEMORY_START_RDRAM = 0x00000000
var MEMORY_START_EXRDRAM = 0x00400000
var MEMORY_START_RAMREGS0 = 0x03F00000
var MEMORY_START_RAMREGS4 = 0x03F04000
var MEMORY_START_RAMREGS8 = 0x03F80000
var MEMORY_START_SPMEM = 0x04000000
var MEMORY_START_SPREG_1 = 0x04040000
var MEMORY_START_SPREG_2 = 0x04080000
var MEMORY_START_DPC = 0x04100000
var MEMORY_START_DPS = 0x04200000
var MEMORY_START_MI = 0x04300000
var MEMORY_START_VI = 0x04400000
var MEMORY_START_AI = 0x04500000
var MEMORY_START_PI = 0x04600000
var MEMORY_START_RI = 0x04700000
var MEMORY_START_SI = 0x04800000
var MEMORY_START_C2A1 = 0x05000000
var MEMORY_START_C1A1 = 0x06000000
var MEMORY_START_C2A2 = 0x08000000
var MEMORY_START_ROM_IMAGE = 0x10000000
var MEMORY_START_GIO = 0x18000000
var MEMORY_START_PIF = 0x1FC00000
var MEMORY_START_PIF_RAM = 0x1FC007C0
var MEMORY_START_C1A3 = 0x1FD00000
var MEMORY_START_DUMMY = 0x1FFF0000

var MEMORY_SIZE_RDRAM = 0x400000
var MEMORY_SIZE_EXRDRAM = 0x400000
var MEMORY_SIZE_RAMREGS0 = 0x10000
var MEMORY_SIZE_RAMREGS4 = 0x10000
var MEMORY_SIZE_RAMREGS8 = 0x10000
var MEMORY_SIZE_SPMEM = 0x2000
var MEMORY_SIZE_SPREG_1 = 0x10000
var MEMORY_SIZE_SPREG_2 = 0x10000
var MEMORY_SIZE_DPC = 0x10000
var MEMORY_SIZE_DPS = 0x10000
var MEMORY_SIZE_MI = 0x10000
var MEMORY_SIZE_VI = 0x10000
var MEMORY_SIZE_AI = 0x10000
var MEMORY_SIZE_PI = 0x10000
var MEMORY_SIZE_RI = 0x10000
var MEMORY_SIZE_SI = 0x10000
var MEMORY_SIZE_C2A1 = 0x8000
var MEMORY_SIZE_C1A1 = 0x8000
var MEMORY_SIZE_C2A2 = 0x20000
var MEMORY_SIZE_GIO_REG = 0x10000
var MEMORY_SIZE_C1A3 = 0x8000
var MEMORY_SIZE_PIF = 0x10000
var MEMORY_SIZE_DUMMY = 0x10000

//cp0
var INDEX = 0
var RANDOM = 1
var ENTRYLO0 = 2
var ENTRYLO1 = 3
var CONTEXT = 4
var PAGEMASK = 5
var WIRED = 6
var RESERVED0 = 7
var BADVADDR= 8
var COUNT = 9
var ENTRYHI = 10
var COMPARE = 11
var STATUS = 12
var CAUSE = 13
var EPC = 14
var PREVID = 15
var CONFIG = 16
var LLADDR = 17
var WATCHLO = 18
var WATCHHI = 19
var XCONTEXT = 20
var RESERVED1 = 21
var RESERVED2 = 22
var RESERVED3 = 23
var RESERVED4 = 24
var RESERVED5 = 25
var PERR = 26
var CACHEERR = 27
var TAGLO = 28
var TAGHI = 29
var ERROREPC = 30
var RESERVED6 = 31

//sp_dmem
var SP_DMEM_TASK = 0x00000FC0

//sp_reg_1
var SP_MEM_ADDR_REG = 0
var SP_DRAM_ADDR_REG = 4
var SP_RD_LEN_REG = 8
var SP_WR_LEN_REG = 12
var SP_STATUS_REG = 16
var SP_DMA_FULL_REG = 20
var SP_DMA_BUSY_REG = 24
var SP_SEMAPHORE_REG = 28

//sp_reg_2
var SP_PC_REG = 0
var SP_IBIST_REG = 4

//vi
var VI_STATUS_REG = 0
var VI_ORIGIN_REG = 4
var VI_WIDTH_REG = 8
var VI_INTR_REG = 12
var VI_CURRENT_REG = 16
var VI_BURST_REG = 20
var VI_V_SYNC_REG = 24
var VI_H_SYNC_REG = 28
var VI_LEAP_REG = 32
var VI_H_START_REG = 36
var VI_V_START_REG = 40
var VI_V_BURST_REG = 44
var VI_X_SCALE_REG = 48
var VI_Y_SCALE_REG = 52

//ai
var AI_DRAM_ADDR_REG = 0
var AI_LEN_REG = 4
var AI_CONTROL_REG = 8
var AI_STATUS_REG = 12
var AI_DACRATE_REG = 16
var AI_BITRATE_REG = 20

//pi
var PI_DRAM_ADDR_REG = 0
var PI_CART_ADDR_REG = 4
var PI_RD_LEN_REG = 8
var PI_WR_LEN_REG = 12
var PI_STATUS_REG = 16
var PI_BSD_DOM1_LAT_REG = 20
var PI_BSD_DOM1_PWD_REG = 24
var PI_BSD_DOM1_PGS_REG = 28
var PI_BSD_DOM1_RLS_REG = 32
var PI_BSD_DOM2_LAT_REG = 36
var PI_BSD_DOM2_PWD_REG = 40
var PI_BSD_DOM2_PGS_REG = 44
var PI_BSD_DOM2_RLS_REG = 48

//ri
var RI_MODE_REG = 0
var RI_CONFIG_REG = 4
var RI_CURRENT_LOAD_REG = 8
var RI_SELECT_REG = 12
var RI_REFRESH_REG = 16
var RI_LATENCY_REG = 20
var RI_RERROR_REG = 24
var RI_WERROR_REG = 28

//mi
var MI_INIT_MODE_REG = 0
var MI_VERSION_REG = 4
var MI_INTR_REG = 8
var MI_INTR_MASK_REG = 12

//si
var SI_DRAM_ADDR_REG = 0
var SI_PIF_ADDR_RD64B_REG = 1
var SI_PIF_ADDR_WR64B_REG = 16
var SI_STATUS_REG = 24

//flags
var SI_STATUS_DMA_BUSY = 0x0001
var SI_STATUS_RD_BUSY = 0x0002
var SI_STATUS_DMA_ERROR = 0x0008
var SI_STATUS_INTERRUPT = 0x1000
var AI_STATUS_FIFO_FULL = 0x80000000
var AI_STATUS_DMA_BUSY = 0x40000000
var PI_STATUS_RESET = 0x01
var PI_STATUS_CLR_INTR = 0x02
var PI_STATUS_ERROR = 0x04
var PI_STATUS_IO_BUSY = 0x02
var PI_STATUS_DMA_BUSY = 0x01

var MI_INTR_SP = 0x00000001
var MI_INTR_SI = 0x00000002
var MI_INTR_AI = 0x00000004
var MI_INTR_VI = 0x00000008
var MI_INTR_PI = 0x00000010
var MI_INTR_DP = 0x00000020
var MI_INTR_MASK_SP = 0x01 //Bit 0: SP intr mask
var MI_INTR_MASK_SI = 0x02 //Bit 1: SI intr mask
var MI_INTR_MASK_AI = 0x04 //Bit 2: AI intr mask
var MI_INTR_MASK_VI = 0x08 //Bit 3: VI intr mask
var MI_INTR_MASK_PI = 0x10 //Bit 4: PI intr mask
var MI_INTR_MASK_DP = 0x20 //Bit 5: DP intr mask
var MI_INTR_MASK_SP_CLR = 0x01
var MI_INTR_MASK_SP_SET = 0x02
var MI_INTR_MASK_SI_CLR = 0x04
var MI_INTR_MASK_SI_SET = 0x08
var MI_INTR_MASK_AI_CLR = 0x10
var MI_INTR_MASK_AI_SET = 0x20
var MI_INTR_MASK_VI_CLR = 0x40
var MI_INTR_MASK_VI_SET = 0x80
var MI_INTR_MASK_PI_CLR = 0x100
var MI_INTR_MASK_PI_SET = 0x200
var MI_INTR_MASK_DP_CLR = 0x400
var MI_INTR_MASK_DP_SET = 0x800

//MI mode register read flags
var MI_MODE_INIT = 0x0080
var MI_MODE_EBUS = 0x0100
var MI_MODE_RDRAM = 0x0200

//MI mode register write flags
var MI_CLR_INIT = 0x0080
var MI_SET_INIT = 0x0100
var MI_CLR_EBUS = 0x0200
var MI_SET_EBUS = 0x0400
var MI_CLR_DP_INTR = 0x0800
var MI_CLR_RDRAM = 0x1000
var MI_SET_RDRAM = 0x2000

//DPC registers
var DPC_START_REG = 0
var DPC_END_REG = 4
var DPC_CURRENT_REG = 8
var DPC_STATUS_REG = 12
var DPC_CLOCK_REG = 16
var DPC_BUFBUSY_REG = 20
var DPC_PIPEBUSY_REG = 24
var DPC_TMEM_REG = 28

//SP_STATUS_REG read flags
var SP_STATUS_HALT = 0x0001
var SP_STATUS_BROKE = 0x0002
var SP_STATUS_DMA_BUSY = 0x0004
var SP_STATUS_DMA_FULL = 0x0008
var SP_STATUS_IO_FULL = 0x0010
var SP_STATUS_SSTEP = 0x0020
var SP_STATUS_INTR_BREAK = 0x0040
var SP_STATUS_YIELD = 0x0080
var SP_STATUS_YIELDED = 0x0100
var SP_STATUS_TASKDONE = 0x0200
var SP_STATUS_SIG3 = 0x0400
var SP_STATUS_SIG4 = 0x0800
var SP_STATUS_SIG5 = 0x1000
var SP_STATUS_SIG6 = 0x2000
var SP_STATUS_SIG7 = 0x4000

//SP_STATUS_REG write flags
var SP_CLR_HALT = 0x0000001
var SP_SET_HALT = 0x0000002
var SP_CLR_BROKE = 0x0000004
var SP_CLR_INTR = 0x0000008
var SP_SET_INTR = 0x0000010
var SP_CLR_SSTEP = 0x0000020
var SP_SET_SSTEP = 0x0000040
var SP_CLR_INTR_BREAK = 0x0000080
var SP_SET_INTR_BREAK = 0x0000100
var SP_CLR_YIELD = 0x0000200
var SP_SET_YIELD = 0x0000400
var SP_CLR_YIELDED = 0x0000800
var SP_SET_YIELDED = 0x0001000
var SP_CLR_TASKDONE = 0x0002000
var SP_SET_TASKDONE = 0x0004000
var SP_CLR_SIG3 = 0x0008000
var SP_SET_SIG3 = 0x0010000
var SP_CLR_SIG4 = 0x0020000
var SP_SET_SIG4 = 0x0040000
var SP_CLR_SIG5 = 0x0080000
var SP_SET_SIG5 = 0x0100000
var SP_CLR_SIG6 = 0x0200000
var SP_SET_SIG6 = 0x0400000
var SP_CLR_SIG7 = 0x0800000
var SP_SET_SIG7 = 0x1000000

//DPC_STATUS_REG read flags
var DPC_STATUS_XBUS_DMEM_DMA = 0x0000001
var DPC_STATUS_FREEZE = 0x0000002
var DPC_STATUS_FLUSH = 0x0000004
var DPC_STATUS_START_GCLK = 0x008 //Bit 3: start gclk
var DPC_STATUS_TMEM_BUSY = 0x010 //Bit 4: tmem busy
var DPC_STATUS_PIPE_BUSY = 0x020 //Bit 5: pipe busy
var DPC_STATUS_CMD_BUSY = 0x040 //Bit 6: cmd busy
var DPC_STATUS_CBUF_READY = 0x080 //Bit 7: cbuf ready
var DPC_STATUS_DMA_BUSY = 0x100 //Bit 8: dma busy
var DPC_STATUS_END_VALID = 0x200 //Bit 9: end valid
var DPC_STATUS_START_VALID = 0x400 //Bit 10: start valid

//DPC_STATUS_REG write flags
var DPC_CLR_XBUS_DMEM_DMA = 0x0000001
var DPC_SET_XBUS_DMEM_DMA = 0x0000002
var DPC_CLR_FREEZE = 0x0000004
var DPC_SET_FREEZE = 0x0000008
var DPC_CLR_FLUSH = 0x0000010
var DPC_SET_FLUSH = 0x0000020
var DPC_CLR_TMEM_REG = 0x0000040
var DPC_CLR_PIPEBUSY_REG = 0x0000080
var DPC_CLR_BUFBUSY_REG = 0x0000100
var DPC_CLR_CLOCK_REG = 0x0000200

var IE = 0x00000001
var EXL = 0x00000002
var ERL = 0x00000004
var BD = 0x80000000
var BEV = 0x00400000

//CAUSE register exception codes
var EXC_INT = 0
var EXC_MOD = 4
var EXC_RMISS = 8
var TLBL_Miss = 8
var EXC_WMISS = 12
var TLBS_Miss = 12
var EXC_RADE = 16
var EXC_WADE = 20
var EXC_IBE = 24
var EXC_DBE = 28
var EXC_SYSCALL = 32
var EXC_BREAK = 36
var EXC_II = 40
var EXC_CPU = 44
var EXC_OV = 48
var EXC_TRAP = 52
var EXC_VCEI = 56
var EXC_FPE = 60
var EXC_WATCH = 92
var EXC_VCED = 124

//Pending interrupt flags
var CAUSE_IP8 = 0x00008000 //External level 8 pending - COMPARE
var CAUSE_IP7 = 0x00004000 //External level 7 pending - INT4
var CAUSE_IP6 = 0x00002000 //External level 6 pending - INT3
var CAUSE_IP5 = 0x00001000 //External level 5 pending - INT2
var CAUSE_IP4 = 0x00000800 //External level 4 pending - INT1
var CAUSE_IP3 = 0x00000400 //External level 3 pending - INT0
var CAUSE_SW2 = 0x00000200 /* Software level 2 pending */
var CAUSE_SW1	= 0x00000100 /* Software level 1 pending */
var CAUSE_BD = 0x80000000


var COP1_CONDITION_BIT = 0x00800000

//TLB
var NTLBENTRIES = 31 //Entry 31 is reserved by rdb
var TLBHI_VPN2MASK = 0xffffe000
var TLBHI_VPN2SHIFT = 13
var TLBHI_PIDMASK = 0xff
var TLBHI_PIDSHIFT = 0
var TLBHI_NPID = 255 //255 to fit in 8 bits
var TLBLO_PFNMASK = 0x3fffffc0
var TLBLO_PFNSHIFT = 6
var TLBLO_CACHMASK = 0x38 //Cache coherency algorithm
var TLBLO_CACHSHIFT = 3
var TLBLO_UNCACHED = 0x10 //Not cached
var TLBLO_NONCOHRNT = 0x18 //Cacheable non-coherent
var TLBLO_EXLWR = 0x28 //Exclusive write
var TLBLO_D = 0x4 //Writeable
var TLBLO_V = 0x2 //Valid bit
var TLBLO_G = 0x1 //global access bit
var TLBINX_PROBE = 0x80000000
var TLBINX_INXMASK = 0x3f
var TLBINX_INXSHIFT = 0
var TLBRAND_RANDMASK = 0x3f
var TLBRAND_RANDSHIFT = 0
var TLBWIRED_WIREDMASK = 0x3f
var TLBCTXT_BASEMASK = 0xff800000
var TLBCTXT_BASESHIFT = 23
var TLBCTXT_BASEBITS = 9
var TLBCTXT_VPNMASK = 0x7ffff0
var TLBCTXT_VPNSHIFT = 4
var TLBPGMASK_4K = 0x0
var TLBPGMASK_16K = 0x6000
var TLBPGMASK_64K = 0x1e000

// sp dmem tasks
var BAD_TASK = 0
var GFX_TASK = 1
var SND_TASK = 2
var JPG_TASK = 4

//os task
var TASK_TYPE = 0x00000FC0
var TASK_FLAGS = 0x00000FC4
var TASK_MICROCODE_BOOT = 0x00000FC8
var TASK_MICROCODE_BOOT_SIZE = 0x00000FCC
var TASK_MICROCODE = 0x00000FD0
var TASK_MICROCODE_SIZE = 0x00000FD4
var TASK_MICROCODE_DATA = 0x00000FD8
var TASK_MICROCODE_DATA_SIZE = 0x00000FDC
var TASK_DRAM_STACK = 0x00000FE0
var TASK_DRAM_STACK_SIZE = 0x00000FE4
var TASK_OUTPUT_BUFF = 0x00000FE8
var TASK_OUTPUT_BUFF_SIZE = 0x00000FEC
var TASK_DATA_PTR = 0x00000FF0
var TASK_DATA_SIZE = 0x00000FF4
var TASK_YIELD_DATA_PTR = 0x00000FF8
var TASK_YIELD_DATA_SIZE = 0x00000FFC

//custom
var MAX_DL_STACK_SIZE = 32
var MAX_DL_COUNT = 1000000
var MAX_VERTS = 80

var RSP_SPNOOP = 0	// handle 0 gracefully 
var RSP_MTX = 1
var RSP_RESERVED0 = 2	// unknown 
var RSP_MOVEMEM = 3	// move a block of memory (up to 4 words) to dmem 
var RSP_VTX = 4
var RSP_RESERVED1 = 5	// unknown 
var RSP_DL = 6
var RSP_RESERVED2 = 7	// unknown 
var RSP_RESERVED3 = 8	// unknown 
var RSP_SPRITE2D = 9	// sprite command 
var RSP_SPRITE2D_BASE = 9	// sprite command

var RSP_1ST = 0xBF
var RSP_TRI1 = (RSP_1ST-0)
var RSP_CULLDL = (RSP_1ST-1)
var RSP_POPMTX = (RSP_1ST-2)
var RSP_MOVEWORD = (RSP_1ST-3)
var RSP_TEXTURE = (RSP_1ST-4)
var RSP_SETOTHERMODE_H = (RSP_1ST-5)
var RSP_SETOTHERMODE_L = (RSP_1ST-6)
var RSP_ENDDL = (RSP_1ST-7)
var RSP_SETGEOMETRYMODE = (RSP_1ST-8)
var RSP_CLEARGEOMETRYMODE = (RSP_1ST-9)
var RSP_LINE3D = (RSP_1ST-10)
var RSP_RDPHALF_1 = (RSP_1ST-11)
var RSP_RDPHALF_2 = (RSP_1ST-12)
var RSP_RDPHALF_CONT = (RSP_1ST-13)

var RSP_MODIFYVTX = (RSP_1ST-13)
var RSP_TRI2 = (RSP_1ST-14)
var RSP_BRANCH_Z = (RSP_1ST-15)
var RSP_LOAD_UCODE = (RSP_1ST-16)

var RSP_SPRITE2D_SCALEFLIP = (RSP_1ST-1)
var RSP_SPRITE2D_DRAW = (RSP_1ST-2)

var RSP_ZELDAVTX = 1
var RSP_ZELDAMODIFYVTX = 2
var RSP_ZELDACULLDL = 3
var RSP_ZELDABRANCHZ = 4
var RSP_ZELDATRI1 = 5
var RSP_ZELDATRI2 = 6
var RSP_ZELDALINE3D = 7
var RSP_ZELDARDPHALF_2 = 0xf1
var RSP_ZELDASETOTHERMODE_H = 0xe3
var RSP_ZELDASETOTHERMODE_L = 0xe2
var RSP_ZELDARDPHALF_1 = 0xe1
var RSP_ZELDASPNOOP = 0xe0
var RSP_ZELDAENDDL = 0xdf
var RSP_ZELDADL = 0xde
var RSP_ZELDALOAD_UCODE = 0xdd
var RSP_ZELDAMOVEMEM = 0xdc
var RSP_ZELDAMOVEWORD = 0xdb
var RSP_ZELDAMTX = 0xda
var RSP_ZELDAGEOMETRYMODE = 0xd9
var RSP_ZELDAPOPMTX = 0xd8
var RSP_ZELDATEXTURE = 0xd7
var RSP_ZELDASUBMODULE = 0xd6

// 4 is something like a conditional DL
var RSP_DMATRI = 0x05
var G_DLINMEM = 0x07

// RDP commands:
var RDP_NOOP = 0xc0
var RDP_SETCIMG = 0xff
var RDP_SETZIMG = 0xfe
var RDP_SETTIMG = 0xfd
var RDP_SETCOMBINE = 0xfc
var RDP_SETENVCOLOR = 0xfb
var RDP_SETPRIMCOLOR = 0xfa
var RDP_SETBLENDCOLOR = 0xf9
var RDP_SETFOGCOLOR = 0xf8
var RDP_SETFILLCOLOR = 0xf7
var RDP_FILLRECT = 0xf6
var RDP_SETTILE = 0xf5
var RDP_LOADTILE = 0xf4
var RDP_LOADBLOCK = 0xf3
var RDP_SETTILESIZE = 0xf2
var RDP_LOADTLUT = 0xf0
var RDP_RDPSETOTHERMODE = 0xef
var RDP_SETPRIMDEPTH = 0xee
var RDP_SETSCISSOR = 0xed
var RDP_SETCONVERT = 0xec
var RDP_SETKEYR = 0xeb
var RDP_SETKEYGB = 0xea
var RDP_FULLSYNC = 0xe9
var RDP_TILESYNC = 0xe8
var RDP_PIPESYNC = 0xe7
var RDP_LOADSYNC = 0xe6
var RDP_TEXRECT_FLIP = 0xe5
var RDP_TEXRECT = 0xe4

var RSP_ZELDA_MTX_MODELVIEW = 0x00
var RSP_ZELDA_MTX_PROJECTION = 0x04
var RSP_ZELDA_MTX_MUL = 0x00
var RSP_ZELDA_MTX_LOAD = 0x02
var RSP_ZELDA_MTX_PUSH = 0x00
var RSP_ZELDA_MTX_NOPUSH = 0x01

// RSP_SETOTHERMODE_L sft: shift count
var RSP_SETOTHERMODE_SHIFT_ALPHACOMPARE = 0
var RSP_SETOTHERMODE_SHIFT_ZSRCSEL = 2
var RSP_SETOTHERMODE_SHIFT_RENDERMODE = 3
var RSP_SETOTHERMODE_SHIFT_BLENDER = 16

// RSP_SETOTHERMODE_H sft: shift count
var RSP_SETOTHERMODE_SHIFT_BLENDMASK = 0	// unsupported 
var RSP_SETOTHERMODE_SHIFT_ALPHADITHER = 4
var RSP_SETOTHERMODE_SHIFT_RGBDITHER = 6

var RSP_SETOTHERMODE_SHIFT_COMBKEY = 8
var RSP_SETOTHERMODE_SHIFT_TEXTCONV = 9
var RSP_SETOTHERMODE_SHIFT_TEXTFILT = 12
var RSP_SETOTHERMODE_SHIFT_TEXTLUT = 14
var RSP_SETOTHERMODE_SHIFT_TEXTLOD = 16
var RSP_SETOTHERMODE_SHIFT_TEXTDETAIL = 17
var RSP_SETOTHERMODE_SHIFT_TEXTPERSP = 19
var RSP_SETOTHERMODE_SHIFT_CYCLETYPE = 20
var RSP_SETOTHERMODE_SHIFT_COLORDITHER = 22	// unsupported in HW 2.0 
var RSP_SETOTHERMODE_SHIFT_PIPELINE = 23

// RSP_SETOTHERMODE_H gPipelineMode 
var RSP_PIPELINE_MODE_1PRIMITIVE = (1 << RSP_SETOTHERMODE_SHIFT_PIPELINE)
var RSP_PIPELINE_MODE_NPRIMITIVE = (0 << RSP_SETOTHERMODE_SHIFT_PIPELINE)

// RSP_SETOTHERMODE_H gSetCycleType 
var CYCLE_TYPE_1 = 0
var CYCLE_TYPE_2 = 1
var CYCLE_TYPE_COPY = 2
var CYCLE_TYPE_FILL = 3

// RSP_SETOTHERMODE_H gSetTextureLUT 
var TLUT_FMT_NONE = (0 << RSP_SETOTHERMODE_SHIFT_TEXTLUT)
var TLUT_FMT_UNKNOWN = (1 << RSP_SETOTHERMODE_SHIFT_TEXTLUT)
var TLUT_FMT_RGBA16 = (2 << RSP_SETOTHERMODE_SHIFT_TEXTLUT)
var TLUT_FMT_IA16 = (3 << RSP_SETOTHERMODE_SHIFT_TEXTLUT)

// RSP_SETOTHERMODE_H gSetTextureFilter 
var RDP_TFILTER_POINT = (0 << RSP_SETOTHERMODE_SHIFT_TEXTFILT)
var RDP_TFILTER_AVERAGE = (3 << RSP_SETOTHERMODE_SHIFT_TEXTFILT)
var RDP_TFILTER_BILERP = (2 << RSP_SETOTHERMODE_SHIFT_TEXTFILT)

// RSP_SETOTHERMODE_L gSetAlphaCompare 
var RDP_ALPHA_COMPARE_NONE = (0 << RSP_SETOTHERMODE_SHIFT_ALPHACOMPARE)
var RDP_ALPHA_COMPARE_THRESHOLD = (1 << RSP_SETOTHERMODE_SHIFT_ALPHACOMPARE)
var RDP_ALPHA_COMPARE_DITHER = (3 << RSP_SETOTHERMODE_SHIFT_ALPHACOMPARE)

// RSP_SETOTHERMODE_L gSetRenderMode 
var Z_COMPARE = 0x0010
var Z_UPDATE = 0x0020
var ZMODE_DEC = 0x0c00

// flags for RSP_SETGEOMETRYMODE
var G_ZBUFFER = 0x00000001
var G_TEXTURE_ENABLE = 0x00000002	// Microcode use only 
var G_SHADE = 0x00000004	// enable Gouraud interp 
var G_SHADING_SMOOTH = 0x00000200	// flat or smooth shaded 
var G_CULL_FRONT = 0x00001000
var G_CULL_BACK = 0x00002000
var G_CULL_BOTH = 0x00003000	// To make code cleaner 
var G_FOG = 0x00010000
var G_LIGHTING = 0x00020000
var G_TEXTURE_GEN = 0x00040000
var G_TEXTURE_GEN_LINEAR = 0x00080000
var G_LOD = 0x00100000	// NOT IMPLEMENTED 

// G_SETIMG fmt: set image formats
var TXT_FMT_RGBA = 0
var TXT_FMT_YUV = 1
var TXT_FMT_CI = 2
var TXT_FMT_IA = 3
var TXT_FMT_I = 4

// G_SETIMG size: set image pixel size
var TXT_SIZE_4b = 0
var TXT_SIZE_8b = 1
var TXT_SIZE_16b = 2
var TXT_SIZE_32b = 3

// Texturing macros
var RDP_TXT_LOADTILE = 7
var RDP_TXT_RENDERTILE = 0
var RDP_TXT_NOMIRROR = 0
var RDP_TXT_WRAP = 0
var RDP_TXT_MIRROR = 0x1
var RDP_TXT_CLAMP = 0x2
var RDP_TXT_NOMASK = 0
var RDP_TXT_NOLOD = 0

// MOVEMEM indices
// Each of these indexes an entry in a dmem table
// which points to a 1-4 word block of dmem in
// which to store a 1-4 word DMA.
var RSP_GBI1_MV_MEM_VIEWPORT = 0x80
var RSP_GBI1_MV_MEM_LOOKATY = 0x82
var RSP_GBI1_MV_MEM_LOOKATX = 0x84
var RSP_GBI1_MV_MEM_L0 = 0x86
var RSP_GBI1_MV_MEM_L1 = 0x88
var RSP_GBI1_MV_MEM_L2 = 0x8a
var RSP_GBI1_MV_MEM_L3 = 0x8c
var RSP_GBI1_MV_MEM_L4 = 0x8e
var RSP_GBI1_MV_MEM_L5 = 0x90
var RSP_GBI1_MV_MEM_L6 = 0x92
var RSP_GBI1_MV_MEM_L7 = 0x94
var RSP_GBI1_MV_MEM_TXTATT = 0x96
var RSP_GBI1_MV_MEM_MATRIX_1 = 0x9e //NOTE: this is in moveword table 
var RSP_GBI1_MV_MEM_MATRIX_2 = 0x98
var RSP_GBI1_MV_MEM_MATRIX_3 = 0x9a
var RSP_GBI1_MV_MEM_MATRIX_4 = 0x9c

var RSP_GBI2_MV_MEM__VIEWPORT = 8
var RSP_GBI2_MV_MEM__LIGHT = 10
var RSP_GBI2_MV_MEM__POINT = 12
var RSP_GBI2_MV_MEM__MATRIX = 14 //NOTE: this is in moveword table
var RSP_GBI2_MV_MEM_O_LOOKATX = (0*24)
var RSP_GBI2_MV_MEM_O_LOOKATY = (1*24)
var RSP_GBI2_MV_MEM_O_L0 = (2*24)
var RSP_GBI2_MV_MEM_O_L1 = (3*24)
var RSP_GBI2_MV_MEM_O_L2 = (4*24)
var RSP_GBI2_MV_MEM_O_L3 = (5*24)
var RSP_GBI2_MV_MEM_O_L4 = (6*24)
var RSP_GBI2_MV_MEM_O_L5 = (7*24)
var RSP_GBI2_MV_MEM_O_L6 = (8*24)
var RSP_GBI2_MV_MEM_O_L7 = (9*24)

// MOVEWORD indices
// Each of these indexes an entry in a dmem table
// which points to a word in dmem in dmem where
// an immediate word will be stored.
var RSP_MOVE_WORD_MATRIX = 0x00	// NOTE: also used by movemem 
var RSP_MOVE_WORD_NUMLIGHT = 0x02
var RSP_MOVE_WORD_CLIP = 0x04
var RSP_MOVE_WORD_SEGMENT = 0x06
var RSP_MOVE_WORD_FOG = 0x08
var RSP_MOVE_WORD_LIGHTCOL = 0x0a
var RSP_MOVE_WORD_POINTS = 0x0c
var RSP_MOVE_WORD_PERSPNORM = 0x0e

// These are offsets from the address in the dmem table
var RSP_MV_WORD_OFFSET_NUMLIGHT = 0x00
var RSP_MV_WORD_OFFSET_CLIP_RNX = 0x04
var RSP_MV_WORD_OFFSET_CLIP_RNY = 0x0c
var RSP_MV_WORD_OFFSET_CLIP_RPX = 0x14
var RSP_MV_WORD_OFFSET_CLIP_RPY = 0x1c
var RSP_MV_WORD_OFFSET_FOG = 0x00	
var RSP_MV_WORD_OFFSET_POINT_RGBA = 0x10
var RSP_MV_WORD_OFFSET_POINT_ST = 0x14
var RSP_MV_WORD_OFFSET_POINT_XYSCREEN = 0x18
var RSP_MV_WORD_OFFSET_POINT_ZSCREEN = 0x1c

// flags to inhibit pushing of the display list (on branch)
var RSP_DLIST_PUSH = 0x00
var RSP_DLIST_NOPUSH = 0x01